import { Router } from "express";
import { getCurrentUserData, updateUser, getOtherUser, getTopUsers, getSearchedUser, followSystem, unfollow, getUserFollowers, getUserFollowing } from "../controllers/userController.js";

const userRouter = Router()

userRouter.get('/me', getCurrentUserData)
userRouter.get('/topusers', getTopUsers)
userRouter.get('/find', getSearchedUser)
userRouter.get('/:username', getOtherUser)
userRouter.get('/:username/followers', getUserFollowers)
userRouter.get('/:username/following', getUserFollowing)

userRouter.post('/follow/:id', followSystem)

userRouter.put('/me', updateUser)

userRouter.delete('/follow/:id', unfollow)

export default userRouter