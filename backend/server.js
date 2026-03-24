import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./connectDB.js"
import userRoutes from "./routes/userRoutes.js"
dotenv.config()
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())

app.use('/user', userRoutes)

const startServer = async () => {
  try {
   await connectDB()
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
  } catch (error) {
  console.error("Server failed to start:", error);
process.exit(1);
  }
}

startServer()