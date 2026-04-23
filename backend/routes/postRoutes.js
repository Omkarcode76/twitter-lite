import { Router } from "express";
import { postPost, getPost, toggleLike} from "../controllers/postController.js";

const postRouter = Router()

postRouter.post('/',postPost)
postRouter.get('/', getPost)

postRouter.post('/like/:id', toggleLike)

export default postRouter