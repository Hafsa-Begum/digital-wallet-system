import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { WalletControllers } from "./wallet.controller";



const router = Router()

router.get("/all-wallets", checkAuth(Role.ADMIN), WalletControllers.getAllWallets)
router.patch("/update", checkAuth(Role.USER), WalletControllers.updateWalletByUser)

export const WalletRoutes = router