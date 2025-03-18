import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { taskEnums } from "../Enums/tasks.enums";


@Schema()
export class Task extends Document {

    @Prop({required: true})
    taskName: string

    @Prop({required: true})
    taskDescription: string

    @Prop({required: true})
    priority: taskEnums

    @Prop({required: true})
    deadline: Date

    @Prop({required: true, default:"pending"})
    status: string

}

export const taskSchema = SchemaFactory.createForClass(Task);
