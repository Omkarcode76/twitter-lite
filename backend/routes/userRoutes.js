import { Router } from "express";
import { getCurrentUserData, updateUser } from "../controllers/userController.js";

const userRouter = Router()

userRouter.get('/me', getCurrentUserData)
userRouter.put('/me', updateUser)
export default userRouter