import { Document } from "mongoose";
import { taskEnums } from "../Enums/tasks.enums";
export declare class Task extends Document {
    taskName: string;
    taskDescription: string;
    priority: taskEnums;
    deadline: Date;
    status: string;
}
export declare const taskSchema: import("mongoose").Schema<Task, import("mongoose").Model<Task, any, any, any, Document<unknown, any, Task> & Task & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, Document<unknown, {}, import("mongoose").FlatRecord<Task>> & import("mongoose").FlatRecord<Task> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
