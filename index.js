import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./utils/db.js"
import cookieParser from "cookie-parser"

// import all routes
import userRoutes from "./routes/user.routes.js"

// path config of env file
dotenv.config()

const app = express()

// cors middleware
app.use(cors({
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST', 'DELETE',  'OPTIONS'],
    allowedHeaders:['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const port = process.env.PORT || 3000

// db connect
db()

// userRoutes
 app.use("/api/v1/users/" , userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
