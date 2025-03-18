import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Users extends Document {
  @Prop({ required: true, default: uuidv4 })
  declare _id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'user' })
  role: string;

  @Prop({required: true, default: false})
  isRevoked: boolean
}

export const usersSchema = SchemaFactory.createForClass(Users);
