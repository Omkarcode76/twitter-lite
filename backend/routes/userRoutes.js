import { Router } from "express";
import { getCurrentUserData, updateUser, getOtherUser } from "../controllers/userController.js";

const userRouter = Router()

userRouter.get('/me', getCurrentUserData)
userRouter.put('/me', updateUser)
userRouter.get('/:username', getOtherUser)
export default userRouter