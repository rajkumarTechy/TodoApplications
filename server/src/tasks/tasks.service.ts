import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './Schema/tasks.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskModel.create(createTaskDto);
    await task.save();

    if (!task) {
      throw new BadRequestException('Error Creating the Tasks');
    }

    return { message: 'Task Created Successfully', task };
  }

  async findAll() {
    const findAllTask = await this.taskModel.find();

    if (!findAllTask) {
      throw new BadRequestException('No Data Found');
    }

    return findAllTask;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const Updates = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {new: true});

    if(!Updates) {
      throw new Error("Updation error");
    }

    return {message:  "Task updated successfully"};

  }
  
  async updateOne(id: string, status: string) {
    await this.taskModel.findByIdAndUpdate(id, { status });

    return {message: "Task Completed Successfully"}
  }
  

  async remove(id: string) {
    const deleteTask = await this.taskModel.findByIdAndDelete(id);

    if (!deleteTask) {
      throw new BadRequestException('Error deleting task');
    }

    return { message: 'Task deleted successfully' };
  }
}
