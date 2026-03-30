import User from "../modles/userSchema.js";
import Post from "../modles/postSchema.js";

const getCurrentUserData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    const posts = await Post.find({ user: userId })
      .populate("user")
      .sort({ createdAt: -1 });
      const x = {user, posts}
    res.status(200).json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const updateUser = async (req, res) => {
 try {
   const userId = req.user.userId
  const {name, dob, bio, profilePic, bgImage} = req.body
  const updatedUser = await User.findByIdAndUpdate(userId,{
    name,
    dob,
    bio,
    profilePic,
    bgImage,
  })

  res.status(200).json(updatedUser)
 } catch (error) {
  res.status(500).json({message: "server error"})
  
 }
}
export { getCurrentUserData, updateUser};
