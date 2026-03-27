import { Router } from "express";
import { postPost, getPost } from "../controllers/postController.js";

const postRouter = Router()

postRouter.post('/',postPost)
postRouter.get('/', getPost)
export default postRouter