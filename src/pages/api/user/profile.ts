import type { NextApiHandler } from "next";
import Util from "@util/index";
import DatabaseManager from "@util/databaseManager";

Util.connectDB();

const UserProfile: NextApiHandler = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await DatabaseManager.User.findOne({ email: email });
        if (!user) return Util.ApiHandler.sendError(res, 0, { errorMessage: "User not found!" });
        Util.ApiHandler.sendSuccess<{
            email: string,
            name: string,
            role: string
        }>(res, {
            email: user.email,
            name: user.name,
            role: user.role
        });
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res);
    };
};

export default UserProfile;