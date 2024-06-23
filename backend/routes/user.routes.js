import { Router } from "express";

import{
    loginUser,
    signUser
} from "../controllers/user.controllers.js"

const router = Router()

router.route("/signup").post(signUser)
router.route("/login").post(loginUser)


export default router
