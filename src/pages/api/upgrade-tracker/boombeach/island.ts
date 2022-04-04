import { BoomBeachIsland } from "@database/Models/boombeach";
import Util from "@util/index";
import type { NextApiHandler } from "next";
import DatabaseManager from "@util/databaseManager";

Util.connectDB();

//@ts-ignore
const Island: NextApiHandler = async (req, res) => {
    try {
        const playerTag = req.body.playerTag;
        const { uid } = req.body.user;
        //Ensures the player's island is in the database
        const newBoomBeachIsland = await DatabaseManager.getBoomBeachIsland({ playerTag: playerTag });
        if (!newBoomBeachIsland) return Util.ApiHandler.sendError(res, 1, {
            errorMessage: "Couldn't find the island in the database!"
        });
        //Fetch user's data
        const user = await DatabaseManager.getUser({ uid: uid });
        if (!user) return Util.ApiHandler.sendError(res, 0, {
            errorMessage: "Couldn't verify island!"
        });
        //Ensures the island is from the session user
        if (!user.boomBeachIslands.includes(newBoomBeachIsland.id)) return Util.ApiHandler.sendError(res, 0, {
            errorMessage: "You don't have permission to view this island!"
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
        Util.ApiHandler.sendError(res, 1);
    };
};

export default Island;