import { Router } from "express";
import { getCurrentUserData } from "../controllers/userController.js";

const userRouter = Router()

userRouter.get('/me', getCurrentUserData)

export default userRouter