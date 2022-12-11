import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_CONNECT_KEY)
    console.log(`Connected to database: ${connect.connection.host}`)
  } catch (error) {
    console.log(`Connection failed: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB