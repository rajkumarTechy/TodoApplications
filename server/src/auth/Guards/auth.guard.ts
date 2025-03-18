import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException("Token Not Found");
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: "dsnjsd@njsd&sdns*jds^jdsj*djssd51ds" });
            request.user = payload; 

            
            const requiredRoles = this.reflector.get<string[]>("role", context.getHandler());
            

            if (requiredRoles && !requiredRoles.includes(payload.role)) {
                throw new ForbiddenException("Access Denied: Insufficient Permissions");
            }

            return true;
        } catch (err) {
            throw new UnauthorizedException("Access Denied: Insufficient Permissions+++++++");
        }
    }
}
