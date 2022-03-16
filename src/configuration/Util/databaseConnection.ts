import mongoose from "mongoose";

const connectDB = () => {
    if (mongoose.connection.readyState >= 1) return;
    mongoose.connect(process.env.MONGODB_URI as string).then((con) => console.log("Connected to DB!"));
};

export default connectDB;