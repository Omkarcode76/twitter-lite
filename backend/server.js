import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
const app = express()
const port = 3000
dotenv.config()
app.use(express.json())
app.use(cors())
await mongoose.connect
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})