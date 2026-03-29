import { Router } from "express";
import { signup, signin } from "../controllers/authController.js";
const userRoutes = Router()

userRoutes.post('/signup',signup)
userRoutes.post('/signin', signin)
export default userRoutes