import { Router } from "express";
import { postPost, getPost, toggleLike, getPostById, postReply, getAllReplies} from "../controllers/postController.js";

const postRouter = Router()

postRouter.post('/',postPost)
postRouter.get('/', getPost)
postRouter.get("/:id", getPostById)
postRouter.get("/replies/:id", getAllReplies)

postRouter.post('/like/:id', toggleLike)
postRouter.post('/reply/:id', postReply)
export default postRouter