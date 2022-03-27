import { BoomBeachIsland } from "@database/Models/boombeach";
import Util from "@util/index";
import type { NextApiHandler } from "next";
import DatabaseManager from "@util/databaseManager";

Util.connectDB();

//@ts-ignore
const Island: NextApiHandler = async (req, res) => {
    try {
        const playerTag = req.body.playerTag;
        const { email } = req.body.user;
        //Ensures the player's island is in the database
        const newBoomBeachIsland = await DatabaseManager.getBoomBeachIsland({ playerTag: playerTag });
        if (!newBoomBeachIsland) return Util.ApiHandler.sendError(res, 1, {
            redirectUrl: "/upgrade-tracker/boombeach"
        });
        //Fetch user's data
        const user = await DatabaseManager.getUser({ email: email });
        if (!user) return Util.ApiHandler.sendError(res, 0, {
            redirectUrl: "/upgrade-tracker/boombeach"
        });
        //Ensures the island is from the session user
        if (!user.boomBeachIslands.includes(newBoomBeachIsland.id)) return Util.ApiHandler.sendError(res, 0, {
            redirectUrl: "/upgrade-tracker/boombeach"
        });
        const returnObj: {
            island: BoomBeachIsland
        } = {
            island: newBoomBeachIsland
        };
        Util.ApiHandler.sendSuccess<{
            island: BoomBeachIsland
        }>(res, returnObj);
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res, 1, {
            redirectUrl: "/upgrade-tracker/boombeach"
        });
    };
};

export default Island;