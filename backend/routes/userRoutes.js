import { Router } from "express";
import { signup } from "../controllers/userController.js";
const userRoutes = Router()

userRoutes.post('/',signup)

export default userRoutes