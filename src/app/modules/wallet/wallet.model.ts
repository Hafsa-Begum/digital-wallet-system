import { model, Schema } from "mongoose";
import { IWallet } from "./wallet.interface";

const walletSchema = new Schema<IWallet>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    balance:{
        type: Number,
        default: 50,
        min: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Wallet = model<IWallet>("Wallet", walletSchema)

