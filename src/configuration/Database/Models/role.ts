import mongoose, { Document, Model } from "mongoose";

//@ts-ignore
export default mongoose.models.role as Model<Document & { 
    /**
     * The name of the role: `user` | `admin`
     */
    name: string; 
}> || mongoose.model<Document & { name: string; }>("role", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
}));