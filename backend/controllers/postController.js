import Post from "../modles/postSchema.js";

const postPost = async (req, res) => {
  try {
    const { content } = req.body;
    const user = req.user;
    
    const post = await Post.create({
      content,
      userId: user.userId,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};


const getPost = async (req, res) => {
    try {
        const user = req.user
        
        const posts = await Post.find({userId: {$ne: user.userid}}).populate("user", "name" "username" "profilepic").sort({createdAt: -1})
        
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: "server error" });
    } 
}
export { postPost, getPost };
