import type { ClashOfClansVillage } from "@models/clashofclans";
import Util from "@util/index";
import type { NextApiHandler } from "next";
import DatabaseManager from "@util/databaseManager";

Util.connectDB();

const Village: NextApiHandler = async (req, res) => {
    try {
        const playerTag = req.body.playerTag;
        const village = req.body.village;
        const { email } = req.body.user;
        //Ensures the player's village is in the database
        const playerSchema = await DatabaseManager.getClashOfClansVillage({ playerTag: playerTag });
        if (!playerSchema) return Util.ApiHandler.sendError(res, 1, {
            errorMessage: "Couldn't find the village in the database!"
        });
        //Fetch user's data
        const user = await DatabaseManager.getUser({ email: email });
        if (!user) return Util.ApiHandler.sendError(res, 0, {
            errorMessage: "Couldn't verify village!"
        });
        //Ensures the village is from the session user
        if (!user.clashOfClansVillages.includes(playerSchema.id)) return Util.ApiHandler.sendError(res, 0, {
            errorMessage: "You don't have permission to view this village!"
        });
        const returnObj: {
            playerSchema: ClashOfClansVillage,
            village?: "home" | "string"
        } = {
            playerSchema: playerSchema,
            village: village
        };
        Util.ApiHandler.sendSuccess<{
            playerSchema: ClashOfClansVillage,
            village?: "home" | "string"
        }>(res, returnObj);
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res, 1);
    };
};

export default Village;