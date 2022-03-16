import type { UserDocument } from "@models/user";
import DatabaseManager from "@util/databaseManager";
import Util from "@util/index";
import type { NextApiHandler } from "next";

Util.connectDB();

const UpdateUser: NextApiHandler = async (req, res) => {
    const { email, update } = req.body;
    //console.log(req.body);
    try {
        if (req.method == "PUT") {
            const user = await DatabaseManager.User.findOne({ email });
            user.updates = update;
            const updatedUser = await user.save();
            Util.ApiHandler.sendSuccess<{
                message: UserDocument
            }>(res, {
                message: updatedUser
            });
            return res.status(200).json({ message: updatedUser });
        } else return res.status(401).json({ error: "Invalid credentials!" });
    } catch (err) {
        console.log(err);
    };
};

export default UpdateUser;