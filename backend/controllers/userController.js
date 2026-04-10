import User from "../modles/userSchema.js";
import Post from "../modles/postSchema.js";
import mongoose from "mongoose";
const getCurrentUserData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    const posts = await Post.find({ user: userId })
      .populate("user", "name username profilePic")
      .sort({ createdAt: -1 });
    const x = { user, posts };
    res.status(200).json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, dob, bio, profilePic, bgImage } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      dob,
      bio,
      profilePic,
      bgImage,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const getOtherUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select(
      "-password -email -dob -__v",
    );
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const userPosts = await Post.find({ user: user._id }).populate(
      "user",
      "name username profilePic _id",
    );
    res.status(200).json({ user, userPosts });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const getTopUsers = async (req, res) => {
  try {
    const topUsers = await User.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(req.user.userId) },
        },
      },
      {
        $addFields: {
          followersCount: { $size: "$followers" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          username: 1,
          profilePic: 1,
          bgImage: 1,
        },
      },
      {
        $sort: { followersCount: -1 },
      },
      {
        $limit: 4,
      },
    ]);

    res.status(200).json(topUsers);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const getSearchedUser = async (req, res) => {
  try {
    const search = req.query.search;
    const user = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ],
    }).select("-password -email -dob -__v");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const followSystem = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const targetUserId = req.params.id;

    const targetUser = await User.findByIdAndUpdate(
      { _id: targetUserId },
      {
        $push: { followers: currentUserId },
      },
    );
    await User.findByIdAndUpdate(
      { _id: currentUserId },
      {
        $push: { following: targetUser._id },
      },
    );
    res.status(200).json(targetUser._id);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const unfollow = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const targetUserId = req.params.id;

    const targetUser = await User.findByIdAndUpdate(
      { _id: targetUserId },
      {
        $pull: { followers: currentUserId },
      },
    );
    await User.findByIdAndUpdate(
      { _id: currentUserId },
      {
        $pull: { following: targetUser._id },
      },
    );
    res.status(200).json(targetUser._id);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
const getUserFollowers = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: `user with username ${username} doesn't exists` });
    }
   
    const followers = await User.find({
  _id: { $in: user.following },
})
  .select("name username bio profilePic")
  .sort({ createdAt: -1 });
    
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export {
  getCurrentUserData,
  updateUser,
  getOtherUser,
  getTopUsers,
  getSearchedUser,
  followSystem,
  unfollow,
  getUserFollowers,
};
