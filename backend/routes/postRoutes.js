import { Router } from "express";
import { postPost, getPost, toggleLike, replyPost, getPostById} from "../controllers/postController.js";

const postRouter = Router()

postRouter.post('/',postPost)
postRouter.get('/', getPost)
postRouter.get("/:id", getPostById)
postRouter.post('/like/:id', toggleLike)
postRouter.post('/reply/:id', replyPost)
export default postRouter