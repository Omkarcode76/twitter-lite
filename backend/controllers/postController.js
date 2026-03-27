import Post from "../modles/postSchema.js";

const postPost = async (req, res) => {
  try {
    const { content } = req.body;
    const user = req.user;
    
    const post = await Post.create({
      content,
      userId: user.userId,
    });

    res.status(201).json({message : "Post created"});
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export { postPost };
