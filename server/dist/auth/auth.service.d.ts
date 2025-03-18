import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Users } from '../users/Schemas/user.model';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<Users>, jwtService: JwtService);
    private RESET_TOKEN;
    SignIn(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    Signout(res: Response): Promise<Response<any, Record<string, any>>>;
    ResetPassword(resetEmail: string): Promise<{
        message: string;
    }>;
    NewPassword(password: string, token: string): Promise<{
        message: string;
    } | undefined>;
    Revoked(Id: string): Promise<{
        isRevoked: boolean;
    }>;
}
