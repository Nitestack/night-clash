import Util from "@util/index";
import mongoose from "mongoose";
import type { Model, Document } from "mongoose";
import validator from "validator";

interface ActualUser {
    //The user's name
    name: string;
    //The user's email
    email: string;
    //The user's role: `user` | `admin`
    role: string;
    //The user's Clash of Clans villages
    clashOfClansVillages?: Array<string>;
    //The jwt token => cookie
    emailToken?: string;
};

export type UserDocument = Document & ActualUser & { 
    //The user's password encrypted
    hash: string; 
    //
    resetToken?: string;
    //
    updates?: string;
    //
    validEmail: "not" | string;
};

export default mongoose.models.user as Model<UserDocument> || mongoose.model<UserDocument>("user", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid E-Mail adress"]
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
    }],
    resetToken: {
        type: String
    },
    updates: {
        type: String
    },
    validEmail: { type: String, default: "not" },
    emailToken: { type: String }
}));