import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from './Schemas/user.model';

@Module({
  imports:[MongooseModule.forFeature([{name: Users.name, schema: Users}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule]
})
export class UsersModule {}
