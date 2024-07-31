import { Router } from "express";

import{
    loginUser,
    signUser,
    resetPassword,
    changePassword,
    verifyOTP,
    checkToken
} from "../controllers/user.controllers.js"
import { authMiddleware } from "../models/user.models.js";

const router = Router()

router.route("/signup").post(signUser)
router.route("/login").post(loginUser)
router.route("/reset").post(resetPassword)
router.route("/change-password").post(authMiddleware, changePassword);
router.route("/otp").post(verifyOTP)
router.route('/check-token').get(checkToken);


export default router
