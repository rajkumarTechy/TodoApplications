import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, usersSchema } from 'src/users/Schemas/user.model';


@Module({
    imports:[MongooseModule.forFeature([{ name: Users.name, schema: usersSchema }])], 
    controllers:[AuthController],
    providers: [AuthService],
    exports: [MongooseModule],
})
export class AuthModule {
    
}
