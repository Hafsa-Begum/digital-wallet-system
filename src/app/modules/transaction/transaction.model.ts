import { model, Schema } from "mongoose";
import { ITransaction, Status, Type } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>({
    type: {
        type: String,
        enum: Object.values(Type),
        default: Type.ADD
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    amount:{
        type: Number,
        default: 0
    },
    fee: {
        type: Number,
        default: 0
    },
    comission: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.PENDING
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Transaction = model<ITransaction>("Transaction", transactionSchema)

