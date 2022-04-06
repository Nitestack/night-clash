import type { NextApiHandler } from "next";
import Util from "@util/index";
import type { APIClan, APIPlayer } from "clashofclans.js";
import { cocClient } from "@util/api";

const ClashOfClansStatsTracker: NextApiHandler = async (req, res) => {
    const tag = Util.validateTag(req.body.tag);
    const element = req.body.element as "clans" | "players";
    try {
        const restManager = cocClient.rest;
        if (element == "players") {
            const response = await restManager.getPlayer(tag);
            if (!response.ok) return Util.ApiHandler.sendError(res, 0, {
                errorMessage: "Couldn't find the player!"
            });
            Util.ApiHandler.sendSuccess<{
                player: APIPlayer
            }>(res, {
                player: response.data
            });
        } else {
            const response = await restManager.getClan(tag);
            if (!response.ok) return Util.ApiHandler.sendError(res, 0, {
                errorMessage: "Couldn't find the clan!"
            });
            Util.ApiHandler.sendSuccess<{
                clan: APIClan
            }>(res, {
                clan: response.data
            });
        };
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res, 1);
    };
};

export default ClashOfClansStatsTracker;