import { NextApiHandler } from "next";
import Util from "@util/index";
import { Clan, Player } from "clashofclans.js";

const ClashOfClansStatsTracker: NextApiHandler = async (req, res) => {
    const tag = req.body.tag as string;
    const element = req.body.element as "clans" | "players";
    const client = await Util.getCoCAPI();
    if (element == "players") {
        const player = await client.getPlayer(tag);
        if (!player) return Util.ApiHandler.sendError(res, 1, "Couldn't find the player!");
        Util.ApiHandler.sendSuccess<{
            player: Player
        }>(res, {
            player: player
        });
    } else {
        const clan = await client.getClan(tag);
        if (!clan) return Util.ApiHandler.sendError(res, 1, "Couldn't find the clan!");
        Util.ApiHandler.sendSuccess<{
            clan: Clan
        }>(res, {
            clan: clan
        });
    };
};

export default ClashOfClansStatsTracker;