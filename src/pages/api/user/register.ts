import type { NextApiHandler } from "next";
import Util from "@util/index";
import DatabaseManager from "@util/databaseManager";
import { UserDocument } from "@models/user";

Util.connectDB();

const Register: NextApiHandler = async (req, res) => {
    const { uid } = req.body;
    try {
        //Creates new user
        const newUser = new DatabaseManager.User({
            uid: uid,
            role: Util.Constants.USER_ROLE_ID
        });
        //Saves the user in the db
        await newUser.save();
        Util.ApiHandler.sendSuccess<{
            user: UserDocument
        }>(res, {
            user: newUser
        });
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res);
    };
};

export default Register;