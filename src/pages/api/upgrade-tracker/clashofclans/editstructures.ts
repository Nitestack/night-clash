import type { NextApiHandler } from "next";
import Util from "@util/index";
import DatabaseManager from "@util/databaseManager";

Util.connectDB();

//@ts-ignore
const EditStructures: NextApiHandler = async (req, res) => {
    const playerTag: string = req.body.playerTag;
        const village: "home" | "builder" = req.body.village;
        const items: {
            [key: string]: string;
        } = req.body;
        delete items.playerTag;
        delete items.village;
    try {
        const playerSchema = await DatabaseManager.getClashOfClansVillage({ playerTag: playerTag });
        if (!playerSchema) return Util.ApiHandler.sendError(res, 1, {
            errorMessage: "Error finding player!"
        });
        const { player, homeVillage, builderBase } = playerSchema;
        const newPlayerSchema = await DatabaseManager.ClashOfClansVillage.findOneAndUpdate({ playerTag: playerTag }, {
            homeVillage: village == "home" ? Util.CocUpgradeTracker.createVillageStructureObject(items, player, village, true) : homeVillage,
            builderBase: village == "builder" ? Util.CocUpgradeTracker.createVillageStructureObject(items, player, village, true) : builderBase
        }, {
            upsert: false,
            new: true
        });
        if (!newPlayerSchema) return Util.ApiHandler.sendError(res, 1, {
            errorMessage: "Couldn't save the new village structure levels!"
        });
        res.redirect(`/upgrade-tracker/clashofclans/${playerTag.replace(/#/g, "")}\#${village}`);
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res, 1, {
            errorMessage: "Coudn't save the new village structure levels!"
        });
    };
};

export default EditStructures;