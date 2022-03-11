import mongoose from "mongoose";
import type { Document, Model } from "mongoose";

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