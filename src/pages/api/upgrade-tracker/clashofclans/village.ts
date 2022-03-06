import { ClashOfClansVillage } from "@models/clashofclans";
import { UserWithoutPassword } from "@models/user";
import Util from "@util/index";
import { NextApiHandler } from "next";
import DatabaseManager from "@util/databaseManager";
 
//@ts-ignore
const Village: NextApiHandler = async (req, res) => {
    const playerTag = req.body.playerTag;
    const village = req.body.village;
    const user: UserWithoutPassword = req.body.user;
    //Ensures the player's village is in the database
    await Util.getConnection();
    const playerSchema = await DatabaseManager.getClashOfClansVillageById(playerTag);
    if (!playerSchema) return res.redirect("/upgrade-tracker/clashofclans");
    //Ensures the village is from the session user
    if (!user.clashOfClansVillages?.includes(playerSchema.id)) return res.redirect("/upgrade-tracker/clashofclans");
    //Ensures, if the village parameter is "builder", that the player unlocked the builder base
    if (village && village == "builder" && !playerSchema.player.builderHallLevel) return res.redirect(`/upgrade-tracker/clashofclans/${playerTag.replace(/#/g, "")}/home`);
    const returnObj: {
        playerSchema: ClashOfClansVillage & { _id: any },
        village?: string
    } = {
        playerSchema: playerSchema
    };
    if (village) returnObj.village = village;
    Util.ApiHandler.sendSuccess<{
        playerSchema: ClashOfClansVillage & { _id: any },
        village?: string
    }>(res, returnObj);
};

export default Village;