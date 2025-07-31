import { model, Schema } from "mongoose";
import { AmountType, IWallet } from "./wallet.interface";

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
    amountType: {type: String,
        enum: Object.values(AmountType)
    },
    amount: {
        type: Number,
        min: 50
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

