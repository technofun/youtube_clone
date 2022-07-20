import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js'
import videosRoutes from './routes/videos.js'
import commentsRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

const connect = () => {
    mongoose.connect(process.env.DB).then(() => {
        console.log('DB connected')
    })
        .catch(err => { throw err; })
}
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videosRoutes)
app.use("/api/comments", commentsRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong!";
    res.status(status).json(
        {
            success: false,
            status,
            message
        }
    )
})
app.listen(PORT, () => {
    connect();
    console.log(`listening on port ${PORT}`)
})