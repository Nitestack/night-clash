import Util from "@util/index";
import mongoose, { Model, Document } from "mongoose";

interface ActualUser {
    //The user's name
    username: string;
    //The user's email
    email: string;
    //The user's role: `user` | `admin`
    role: string;
    //The user's Clash of Clans villages
    clashOfClansVillages?: Array<string>;
};

export type User = ActualUser & { id: string; hash: string; };

export type UserWithoutPassword = ActualUser & { _id: string; };

type DocumentUser = ActualUser & { 
    //The user's password encrypted
    hash: string; 
};

export type UserDocument = Document & DocumentUser;

//@ts-ignore
export default mongoose.models.user as Model<UserDocument> || mongoose.model<UserDocument>("user", new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: Util.Constants.USER_ROLE_ID
    },
    clashOfClansVillages: [{
        type: String
    }]
}));