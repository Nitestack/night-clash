import type { ClashOfClansVillage } from "@models/clashofclans";
import Util from "@util/index";
import type { NextApiHandler } from "next";
import DatabaseManager from "@util/databaseManager";

Util.connectDB();

//@ts-ignore
const Village: NextApiHandler = async (req, res) => {
    const playerTag = req.body.playerTag;
    const user = req.body.user;
    //Ensures the player's village is in the database
    
    const playerSchema = await DatabaseManager.getClashOfClansVillageById(playerTag);
    if (!playerSchema) return res.redirect("/upgrade-tracker/clashofclans");
    //Ensures the village is from the session user
    if (!user.clashOfClansVillages?.includes(playerSchema.id)) return res.redirect("/upgrade-tracker/clashofclans");
    const returnObj: {
        playerSchema: ClashOfClansVillage & { _id: any },
        village?: string
    } = {
        playerSchema: playerSchema
    };
    Util.ApiHandler.sendSuccess<{
        playerSchema: ClashOfClansVillage & { _id: any },
        village?: string
    }>(res, returnObj);
};

export default Village;