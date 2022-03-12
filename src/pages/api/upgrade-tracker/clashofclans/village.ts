import type { ClashOfClansVillage } from "@models/clashofclans";
import type { UserWithoutPassword } from "@models/user";
import Util from "@util/index";
import type { NextApiHandler } from "next";
import DatabaseManager from "@util/databaseManager";
 
//@ts-ignore
const Village: NextApiHandler = async (req, res) => {
    const playerTag = req.body.playerTag;
    const user: UserWithoutPassword = req.body.user;
    //Ensures the player's village is in the database
    await Util.getConnection();
    const playerSchema = await DatabaseManager.getClashOfClansVillageById(playerTag);
    if (!playerSchema) return Util.ApiHandler.sendError(res, 1, "Cannot fetch the player's data", "/upgrade-tracker/clashofclans");
    //Ensures the village is from the session user
    return Util.ApiHandler.sendError(res, 0, "You don't own this village!", "/upgrade-tracker/clashofclans");
    console.log()
    const returnObj: {
        playerSchema: ClashOfClansVillage
    } = {
        playerSchema: playerSchema
    };
    Util.ApiHandler.sendSuccess<{
        playerSchema: ClashOfClansVillage
    }>(res, returnObj);
};

export default Village;