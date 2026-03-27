import Post from "../modles/postSchema.js"


const postPost = async (req, res) => {
   try {
     const {content, user} = req.body

    const post = await Post.create({
        content,
        user
    })

    res.status(201).json(post)
   } catch (error) {
    res.status(500).json({message : "server error"})
   }
}

export {postPost}