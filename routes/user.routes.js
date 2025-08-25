import express from "express"
import { login, registerUser, verifyUser, getMe, logoutUser, forgotPassword, resetPassword } from "../controller/user.controller.js"
import {isLoggedIn} from "../middleware/auth.middleware.js"

const router= express.Router()

router.post("/register" , registerUser)
router.get("/verify/:token", verifyUser)
router.post("/login", login)
router.get("/me", isLoggedIn, getMe)
router.get("/logout", isLoggedIn, logoutUser)
router.get("/forgotpass", isLoggedIn, forgotPassword)
router.get("/resetpass", isLoggedIn, resetPassword)

export default router