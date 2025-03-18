import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    SignIn(createUserDto: CreateUserDto, response: any): Promise<import("express").Response<any, Record<string, any>>>;
    Profile(): {
        message: string;
    };
    SignOut(response: any): Promise<import("express").Response<any, Record<string, any>>>;
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
