import Post from "../modles/postSchema.js";
import User from "../modles/userSchema.js";
const postPost = async (req, res) => {
  try {
    const { content } = req.body;
    const user = req.user;

    const post = await Post.create({
      content,
      user: user.userId,
    });
    const populatedPost = await post.populate(
      "user",
      "name username profilePic",
    );
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const getPost = async (req, res) => {
  try {
    const feedType = req.query.feed;
    if (feedType === "following") {
      const userId = req.user.userId;
      const user = await User.findById(userId);
      const posts = await Post.find({
        user: { $in: user.following },
      }).populate("user", "name username profilePic").sort({ createdAt: -1 });
      res.status(200).json(posts);
    } else {
      const posts = await Post.find()
        .populate("user", "name username profilePic")
        .sort({ createdAt: -1 });
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
export { postPost, getPost };
