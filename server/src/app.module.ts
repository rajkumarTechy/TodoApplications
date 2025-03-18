import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';


@Module({
  imports: [TasksModule,
    JwtModule.register({
      global: true,
      secret: "dsnjsd@njsd&sdns*jds^jdsj*djssd51ds",
    }),
    MongooseModule.forRoot('mongodb+srv://rajkumar_2001:hSXbUL1esep9PT3N@cluster0.ala5p.mongodb.net/test'), AuthModule, UsersModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
  exports:[MongooseModule]
})
export class AppModule {}
