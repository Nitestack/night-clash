import type { ClashOfClansVillage } from "@models/clashofclans";
import Util from "@util/index";
import type { NextApiHandler } from "next";
import DatabaseManager from "@util/databaseManager";

Util.connectDB();

const Village: NextApiHandler = async (req, res) => {
    try {
        const playerTag = req.body.playerTag;
        const { email } = req.body.user;
        //Ensures the player's village is in the database
        const playerSchema = await DatabaseManager.getClashOfClansVillage({ playerTag: playerTag });
        if (!playerSchema) return Util.ApiHandler.sendError(res, 1, {
            redirectUrl: "/upgrade-tracker/clashofclans"
        });
        //Fetch user's data
        const user = await DatabaseManager.getUser({ email: email });
        if (!user) return Util.ApiHandler.sendError(res, 0, {
            redirectUrl: "/upgrade-tracker/clashofclans"
        });
        //Ensures the village is from the session user
        if (!user.clashOfClansVillages.includes(playerSchema.id)) return Util.ApiHandler.sendError(res, 0, {
            redirectUrl: "/upgrade-tracker/clashofclans"
        });
        const returnObj: {
            playerSchema: ClashOfClansVillage
        } = {
            playerSchema: playerSchema
        };
        Util.ApiHandler.sendSuccess<{
            playerSchema: ClashOfClansVillage
        }>(res, returnObj);
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res, 1, {
            redirectUrl: "/upgrade-tracker/clashofclans"
        });
    };
};

export default Village;