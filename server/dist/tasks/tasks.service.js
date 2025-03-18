"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tasks_schema_1 = require("./Schema/tasks.schema");
let TasksService = class TasksService {
    taskModel;
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async create(createTaskDto) {
        const task = await this.taskModel.create(createTaskDto);
        await task.save();
        if (!task) {
            throw new common_1.BadRequestException('Error Creating the Tasks');
        }
        return { message: 'Task Created Successfully', task };
    }
    async findAll() {
        const findAllTask = await this.taskModel.find();
        if (!findAllTask) {
            throw new common_1.BadRequestException('No Data Found');
        }
        return findAllTask;
    }
    findOne(id) {
        return `This action returns a #${id} task`;
    }
    async update(id, updateTaskDto) {
        const Updates = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
        if (!Updates) {
            throw new Error("Updation error");
        }
        return { message: "Task updated successfully" };
    }
    async updateOne(id, status) {
        await this.taskModel.findByIdAndUpdate(id, { status });
        return { message: "Task Completed Successfully" };
    }
    async remove(id) {
        const deleteTask = await this.taskModel.findByIdAndDelete(id);
        if (!deleteTask) {
            throw new common_1.BadRequestException('Error deleting task');
        }
        return { message: 'Task deleted successfully' };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tasks_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TasksService);
//# sourceMappingURL=tasks.service.js.map