import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { Wallet } from "../wallet/wallet.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
    const { name, phone, password, role, ...rest } = payload;

    const isUserExist = await User.findOne({ phone })

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
    }

    const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))
    let isApproved = false;
    if(role?.toUpperCase() === 'AGENT'){
        isApproved = true;
    }

    const user = await User.create({
        name,
        isApproved: isApproved,
        role,
        phone,
        password: hashedPassword,
        ...rest
    })

    // Create wallet for user
    await Wallet.create({
        user: user._id,
      });

    return user

}

const getAllUsers = async (userRole:string) => {
    const users = await User.find({role: userRole});
    const totalUsers = await User.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUsers
        }
    }
};

export const UserServices = {
    createUser,
    getAllUsers
}