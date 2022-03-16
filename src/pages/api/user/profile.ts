import type { NextApiHandler } from "next";
import Util from "@util/index";
import DatabaseManager from "@util/databaseManager";
import omit from "omit";

Util.connectDB();

const UserProfile: NextApiHandler = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await DatabaseManager.User.findOne({ email: email });
        return res.status(200).send(omit("password", user));
    } catch (err) {
        console.log(err);
    };
};

export default UserProfile;