import { Types } from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    AGENT = "AGENT",
}

export interface IUser {
    name: string;
    phone: string;
    password?: string;
    email?: string;
    picture?: string;
    address?: string;
    isDeleted?: string;
    isBlocked?: boolean;
    isApproved?: boolean;
    role: Role;
    wallet: Types.ObjectId;
    transactions?: Types.ObjectId[];
}