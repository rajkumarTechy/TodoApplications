import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<{
        message: string;
        task: import("mongoose").Document<unknown, {}, import("./Schema/tasks.schema").Task> & import("./Schema/tasks.schema").Task & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./Schema/tasks.schema").Task> & import("./Schema/tasks.schema").Task & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): string;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<{
        message: string;
    }>;
    updateOne(id: string, updateTaskDto: Partial<UpdateTaskDto>): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
