import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export default connectToDatabase;
