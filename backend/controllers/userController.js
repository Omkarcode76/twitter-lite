import User from "../modles/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const signup = async (req, res) => {
  try {
    const { name, username, email, password, dob, bio, profilePic } = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      dob,
      bio,
      profilePic,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ field: "server", message: "server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error! try after some time" });
  }
};
export { signup, signin };
