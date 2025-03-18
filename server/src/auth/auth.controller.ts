import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
  Res,
  Patch,
  Param,
} from '@nestjs/common';
// import { createUserDto } from './dto/create-dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './Guards/auth.guard';
import { Roles } from './decorator/role.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('login')
  SignIn(@Body(ValidationPipe) createUserDto: CreateUserDto, @Res() response) {
    return this.AuthService.SignIn(createUserDto, response);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @Roles('admin')
  Profile() {
    return { message: 'Admin Access Granted' };
  }

  @Post('logout')
  SignOut(@Res() response) {
    return this.AuthService.Signout(response);
  }

  @Post('resetPassword')
  ResetPassword(@Body('resetEmail') resetEmail: string) {
    return this.AuthService.ResetPassword(resetEmail);
  }

  @Patch('newPassword')
  NewPassword(
    @Body('password') password: string,
    @Body('token') token: string,
  ) {
    return this.AuthService.NewPassword(password, token);
  }

  @Get('isRevoked/:Id')
  Revoked(@Param('Id') Id: string ) {
    return this.AuthService.Revoked(Id);
  }
}
