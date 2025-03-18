import { IsDate, IsEnum, IsString } from "class-validator";
import { taskEnums } from "../Enums/tasks.enums";

export class CreateTaskDto {

    @IsString()
    taskName: string

    @IsString()
    taskDescription: string

    @IsEnum(taskEnums)
    priority: taskEnums

    @IsString()
    deadline: Date

    @IsString()
    status: string
}
