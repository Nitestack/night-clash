import type { NextApiHandler } from "next";
import Util from "@util/index";
import DatabaseManager from "@util/databaseManager";

const EditUsername: NextApiHandler = async (req, res) => {
    const { username, email } = req.body;
    try {
        const user = await DatabaseManager.getUser({ name: username });
        if (user) return Util.ApiHandler.sendError(res, 0, { errorMessage: "Username already taken!" });
        else {
            await DatabaseManager.User.findOneAndUpdate({ 
                email: email 
            }, {
                name: username
            }, {
                upsert: false
            });
            Util.ApiHandler.sendSuccess(res, {});
        };
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res);
    };
};

export default EditUsername;