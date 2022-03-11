import type { NextApiHandler } from "next";
import Util from "@util/index";
import DatabaseManager from "@util/databaseManager";

const Example: NextApiHandler = async (req, res) => {
    const { playerTag, village } = req.body;
    const restManager = (await Util.getCoCAPI()).rest;
    const response = await restManager.getPlayer(Util.validateTag(playerTag));
    if (response.status != 200) return Util.ApiHandler.sendError(res, 1, "Couldn't fetch the player in the Clash of Clans API!");
    const player = response.data;
    await Util.getConnection();
    const playerSchema = await DatabaseManager.ClashOfClansVillage.findOne({ playerTag: playerTag });
    if (!playerSchema) return Util.ApiHandler.sendError(res, 1, "Couldn't save player's new data in the database!");
    playerSchema.player = player;
    playerSchema.homeVillage = Util.CocUpgradeTracker.createVillageStructureObject(playerSchema.homeVillage, player, village);
    playerSchema.builderBase = Util.CocUpgradeTracker.createVillageStructureObject(playerSchema.builderBase, player, village);
    await playerSchema.save();
    Util.ApiHandler.sendSuccess(res, {});
};

export default Example;