import { taskEnums } from "../Enums/tasks.enums";
export declare class CreateTaskDto {
    taskName: string;
    taskDescription: string;
    priority: taskEnums;
    deadline: Date;
    status: string;
}
