import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import authUser from "./middleware/userAuthMiddleware.js";
import userRouter from "./routes/userRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/post", authUser, postRouter);
app.use("/user", authUser, userRouter)
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
