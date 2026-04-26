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

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate(
      "user",
      "name username profilePic",
    );
    if (!post) {
      return res.status(404).json({ message: "post doesn't exist" });
    }
    res.status(200).json(post);
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
      })
        .populate("user", "name username profilePic")
        .sort({ createdAt: -1 });
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

const toggleLike = async (req, res) => {
  try {
    const userId = req.user.userId;

    const post = await Post.findById(req.params.id);

    const alreadyLiked = post.likes.includes(userId);

    if (!alreadyLiked) {
      post.likes.push(userId);
    } else {
      post.likes.pull(userId);
    }
    await post.save();

    res.status(200).json({ liked: !alreadyLiked, userId });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
const replyPost = async (params) => {};

export { postPost, getPost, toggleLike, replyPost, getPostById };
