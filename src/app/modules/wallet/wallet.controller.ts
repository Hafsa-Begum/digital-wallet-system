import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { WalletServices } from "./wallet.service";

const updateWalletByUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const verifiedToken = req.user;
    const result = await WalletServices.updateWalletByUser(req.body, verifiedToken);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Add Money to Wallet Successfully",
        data: result.data,
        meta: result.meta
    })
})
const getAllWallets = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await WalletServices.getAllWallets();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Wallet Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})

export const WalletControllers = {
    updateWalletByUser,
    getAllWallets
}