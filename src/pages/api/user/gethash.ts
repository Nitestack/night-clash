import type { NextApiHandler } from "next";
import Util from "@util/index";
import DatabaseManager from "@util/databaseManager";

Util.connectDB();

const GetHash: NextApiHandler = async (req, res) => {
    try {
        const { email }= req.body;
        const user = await DatabaseManager.getUser({ email: email });
        if (!user) return Util.ApiHandler.sendError(res, 0, { errorMessage: "User not found!" });
        Util.ApiHandler.sendSuccess<{
            hash: string
        }>(res, {
            hash: user.hash
        });
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res);
    };
};

export default GetHash;