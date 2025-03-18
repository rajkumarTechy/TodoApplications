import { Document } from 'mongoose';
export declare class Users extends Document {
    _id: string;
    email: string;
    password: string;
    role: string;
    isRevoked: boolean;
}
export declare const usersSchema: import("mongoose").Schema<Users, import("mongoose").Model<Users, any, any, any, Document<unknown, any, Users> & Users & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Users, Document<unknown, {}, import("mongoose").FlatRecord<Users>> & import("mongoose").FlatRecord<Users> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
