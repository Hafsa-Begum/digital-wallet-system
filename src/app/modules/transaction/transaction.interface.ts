import { Types } from "mongoose";

export enum Type{
    ADD = 'ADD',
    WITHDRAW = 'WITHDRAW',
    SEND = 'SEND',
    CASH_IN = 'CASH_IN',
    CASH_OUT = 'CASH_OUT'
}
export enum Status{
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    REVERSED = 'REVERSED'
}
export interface ITransaction{
    //'add', 'withdraw', 'send', 'cash-in', 'cash-out'
    type: Type;
    from: Types.ObjectId;
    to: Types.ObjectId;
    amount: number;
    fee: number;
    comission: number;
    status: Status
}