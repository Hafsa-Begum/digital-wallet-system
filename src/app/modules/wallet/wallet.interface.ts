import { Types } from "mongoose";

export enum AmountType {
    ADD = "ADD",
    SEND = "SEND",
    WITHDRAW = "WITHDRAW",
    CASH_IN = "CASH_IN",
    CASH_OUT = "CASH_OUT"
}

export interface IWallet{
    user: Types.ObjectId;
    balance: number;
    amountType?: AmountType;
    amount?: number;
    isBlocked: boolean;
}