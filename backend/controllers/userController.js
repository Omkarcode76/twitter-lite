import User from "../modles/userSchema.js"
import bcrypt from "bcrypt"

const signup = async(req, res) => {
    try {
        const {name, username, email, password, dob, bio, profilePic} = req.body
    const hashedPassword = await bcrypt.hash(password, 8)
    const user = await User.create({
    name,
    username,
    email,
    password : hashedPassword,
    dob,
    bio,
    profilePic,
  })
  res.status(201).json(user)
    } catch (err) {
       
        res.status(400).json({field : "server", message : "server error"})
    }
  
}

export {signup}