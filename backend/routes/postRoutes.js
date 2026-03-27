import { Router } from "express";
import { postPost } from "../controllers/postController.js";

const postRouter = Router()

postRouter.post('/',postPost)

export default postRouter