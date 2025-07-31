import { model, Schema } from "mongoose";
import {IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: { type: String },
    phone: { type: String, required: true, unique: true  },
    password: { type: String, required: true },
    email: { type: String},
    role: {
        type: String,
        uppercase: true,
        enum: Object.values(Role),
        default: Role.USER
    },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    //for maintaining approved/suspended agent
    isApproved: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    wallet: {
        type: Schema.Types.ObjectId, 
        ref: 'Wallet'
    },
    transactions: {
        type: [Schema.Types.ObjectId], 
        ref: 'Transaction'
    }
}, {
    timestamps: true,
    versionKey: false
})

export const User = model<IUser>("User", userSchema)