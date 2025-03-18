import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
// import { createUserDto } from './dto/create-dto';
import { InjectModel } from '@nestjs/mongoose';
// import { User } from './Schema/user.add';
import mongoose, { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { sendEmail } from '../Utils/EmailService';
import { Users } from 'src/users/Schemas/user.model';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private jwtService: JwtService
  ) {}

  private RESET_TOKEN = 'sddsbhdn@@nsndfsjnfsjn(hsdfsd)';

  async SignIn(createUserDto: CreateUserDto, res: Response) {
    const { email, password } = createUserDto;

    const user = await this.userModel.findOne({ email }).lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordBcrypt = await bcrypt.compare(password, user.password);

    if (!passwordBcrypt) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = this.jwtService.sign(
      { userId: user._id, role: user.role },
      { expiresIn: '1h' },
    );

    res.cookie('token', access_token, {
      maxAge: 15 * 60 * 1000,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });

    return res.status(200).json({ access_token, message: 'Login Successful' });
  }

  async Signout(res: Response) {
    res.cookie('token', '', { maxAge: 0 });

    return res.status(200).json({ message: 'Logout Successful' });
  }

  async ResetPassword(resetEmail: string) {
    const User = await this.userModel.findOne({ email: resetEmail });

    if (!User) {
      throw new NotFoundException('Email Not Found');
    }

    const token = this.jwtService.sign(
      { userId: User._id, email: User.email },
      { secret: this.RESET_TOKEN, expiresIn: '5m' },
    );

    if(token) {
      await this.userModel.findByIdAndUpdate(User._id, {isRevoked: false});
    };

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    const emailSend = await sendEmail(resetEmail, resetLink);


    if (emailSend.status === 200) {
      return { message: 'Email send Successfully' };
    } else {
      return { message: 'Error Sending Email' };
    }
  }

  async NewPassword(password: string, token: string) {
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: this.RESET_TOKEN,
      });

      if (!decoded || !decoded.userId) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const users = await this.userModel.findById(decoded.userId);

      if(users?.isRevoked === true) {
        console.log("Password Already Updated");
        return;
      }

      const result = await this.userModel.findByIdAndUpdate(
        decoded.userId, 
        { password: hashedPassword, isRevoked: true } ,
        { new: true }
      );
      
      if (!result) {
        throw new NotFoundException('User not Found');
      }
      await result.save();

      if (!result) {
        throw new NotFoundException('User not Found');
      }

      return { message: 'Password Updated Successfully' };
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async Revoked(Id: string) {
    const userState = await this.userModel.findById(Id);

    if(!userState) {
      throw  new NotFoundException("User Not Found");
    }

   return {isRevoked: userState?.isRevoked}
  }
}
