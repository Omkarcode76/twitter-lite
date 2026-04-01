import User from "../modles/userSchema.js";
import Post from "../modles/postSchema.js";

const getCurrentUserData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    const posts = await Post.find({ user: userId })
      .populate("user", "name username profilePic")
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

const getOtherUser = async (req, res) => {
  try {
    const {username} = req.params
    const user = await User.findOne({username}).select("-password -email -dob -__v")
    if(!user){
      return res.status(404).json({message: "user not found"})
    }
    const userPosts = await Post.find({user: user._id}).populate("user", "name username profilePic")
    res.status(200).json({user, userPosts})
  } catch (error) {
     res.status(500).json({message: "server error"})
  }
}

const getTopUsers = async (req, res) => {
  try { 
    const topUsers = await User.aggregate([
  {
    $addFields: {
      followersCount: { $size: "$followers" }
    }
  },
  {
    $sort: { followersCount: -1 }
  },
  {
    $limit: 4
  }
]);

res.status(200).json(topUsers)
  } catch (error) {
     res.status(500).json({message: "server error"})
  }
}
export { getCurrentUserData, updateUser, getOtherUser, getTopUsers};
