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
    from: String;
    to: String;
    amount: number;
    //apply to user send, cash-out, 
    fee: number;
    //apply to agent cash-in,
    comission: number;
    status: Status
}