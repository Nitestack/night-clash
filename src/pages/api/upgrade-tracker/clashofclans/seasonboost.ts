import type { ClashOfClansVillage } from "@models/clashofclans";
import Util from "@util/index";
import type { NextApiHandler } from "next";
import DatabaseManager from "@util/databaseManager"; 

const SeasonBoost: NextApiHandler = async (req, res) => {
    const { playerTag, builderBoost, researchBoost } = req.body;
    await Util.connectDB();
    const playerSchema = await DatabaseManager.ClashOfClansVillage.findOneAndUpdate({ 
        playerTag: playerTag
    }, {
        builderSeasonBoost: parseInt(builderBoost),
        researchSeasonBoost: parseInt(researchBoost)
    }, {
        upsert: false,
        new: true
    });
    if (!playerSchema) return Util.ApiHandler.sendError(res, 1, {
        errorMessage: "Couldn't set season boosts!"
    });
    Util.ApiHandler.sendSuccess<{ playerSchema: ClashOfClansVillage }>(res, {
        playerSchema: playerSchema
    });
};

export default SeasonBoost;






