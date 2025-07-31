import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { ITransaction } from "../transaction/transaction.interface";
import { Transaction } from "../transaction/transaction.model";
import { Wallet } from "./wallet.model";

const updateWalletByUser = async (payload: Partial<ITransaction>, decodedToken: JwtPayload) => {
    console.log("payload", payload)
    console.log("decoded toekn", decodedToken)
    const isWalletExist = await Wallet.findOne({user: decodedToken.userId});

    if (!isWalletExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Wallet Not Found")
    }


    if (payload?.type === 'ADD') {
        // if (decodedToken.role === Role.USER || decodedToken.role === Role.AGENT) {
        //     throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        // }

        isWalletExist.balance += Number(payload.amount)
        // Create transaction while add to user wallet
        await Transaction.create({
            type: payload.type,
            from: "external/bank",
            to: decodedToken.phone,
            amount: payload.amount,
            status: "COMPLETED"
        });
    }

    if (payload?.type === 'WITHDRAW' || payload?.type === 'SEND' || payload?.type === 'CASH_OUT') {
        // if (decodedToken.role === Role.USER || decodedToken.role === Role.AGENT) {
        //     throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        // }

        isWalletExist.balance -= Number(payload.amount)
    }


    const newUpdatedWallet = await Wallet.findOneAndUpdate({user: decodedToken.userId}, {
        balance: isWalletExist.balance,
        amountType: payload?.type,
        amount: payload?.amount
    }, { new: true, runValidators: true })
    console.log("wallet balnce", isWalletExist.balance)
    return newUpdatedWallet
}
const getAllWallets = async () => {
    const users = await Wallet.find({});
    const totalUsers = await Wallet.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUsers
        }
    }
};

export const WalletServices = {
    updateWalletByUser,
    getAllWallets,

}