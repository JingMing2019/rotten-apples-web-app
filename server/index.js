import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './utils/connectDB.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import googleBookSearchRoutes from './routes/googleBookSearchRoutes.js'
import reviewRoutes from "./routes/reviewRoutes.js";
import mongoose from "mongoose";

dotenv.config()

const app = express()

// handle json body
app.use(cors())

app.use(express.json())

app.use('/api/users', userRoutes)

app.use('/api/books', bookRoutes)

app.use('/api/reviews', reviewRoutes)

app.use('/api/google', googleBookSearchRoutes)

app.get('/', (req, res) => {res.send('Welcome to Rotten Apples Node server app!')})

mongoose.set('strictQuery', true);

const PORT = process.env.PORT || 4000

connectDB().then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)));

// If reach here, raise not found error
app.use(notFound)

// handle error
app.use(errorHandler)