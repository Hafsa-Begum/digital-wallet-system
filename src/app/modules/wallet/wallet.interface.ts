import { Types } from "mongoose";

export interface Wallet{
    user: Types.ObjectId;
    balance: number;
    isBlocked: boolean;
}