import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const seedAdmin = async () => {
    try {
        const isAdminExist = await User.findOne({ phone: envVars.ADMIN_PHONE })

        if (isAdminExist) {
            console.log("Admin Already Exists!");
            return;
        }

        console.log("Trying to create Admin...");

        const hashedPassword = await bcryptjs.hash(envVars.ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))


        const payload: IUser = {
            name: "admin",
            role: Role.ADMIN,
            phone: envVars.ADMIN_PHONE,
            password: hashedPassword,
            isApproved: true

        }

        const admin = await User.create(payload)
        console.log("Admin Created Successfuly! \n");
        console.log(admin);
    } catch (error) {
        console.log(error);
    }
}