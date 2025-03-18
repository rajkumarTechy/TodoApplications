import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './Schemas/user.model';
import { Model } from 'mongoose';
export declare class UsersService {
    private usersModel;
    constructor(usersModel: Model<Users>);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
