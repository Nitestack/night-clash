import type { NextApiHandler } from "next";
import Util from "@util/index";
import DatabaseManager from "@util/databaseManager";

Util.connectDB();

const Example: NextApiHandler = async (req, res) => {
    const { playerTag, village } = req.body;
    try {
        const client = await Util.getAPI("coc");
        const restManager = client.rest;
        const response = await restManager.getPlayer(Util.validateTag(playerTag));
        if (response.status != 200) return Util.ApiHandler.sendError(res, 1, {
            errorMessage: "Couldn't fetch the player in the Clash of Clans API!"
        });
        const player = response.data;
        const playerSchema = await DatabaseManager.ClashOfClansVillage.findOne({ playerTag: playerTag });
        if (!playerSchema) return Util.ApiHandler.sendError(res, 1, {
            errorMessage: "Couldn't save player's new data in the database!"
        });
        playerSchema.player = player;
        playerSchema.homeVillage = Util.CocUpgradeTracker.createVillageStructureObject(playerSchema.homeVillage, player, village);
        playerSchema.builderBase = Util.CocUpgradeTracker.createVillageStructureObject(playerSchema.builderBase, player, village);
        await playerSchema.save();
        Util.ApiHandler.sendSuccess(res, {});
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res);
    };
};

export default Example;