import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { Task } from './Schema/tasks.schema';
export declare class TasksService {
    private taskModel;
    constructor(taskModel: Model<Task>);
    create(createTaskDto: CreateTaskDto): Promise<{
        message: string;
        task: import("mongoose").Document<unknown, {}, Task> & Task & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Task> & Task & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: number): string;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<{
        message: string;
    }>;
    updateOne(id: string, status: string): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
