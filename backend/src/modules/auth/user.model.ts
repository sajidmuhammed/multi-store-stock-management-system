import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "./user.role.enum";

export interface IUser extends Document {
    name: string;
    email: string; password: string; role: UserRole;
    createdAt: Date; updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.SHOPPER,
    }
}
, { timestamps: true });

export const UserModel = mongoose.model<IUser>("User", UserSchema);