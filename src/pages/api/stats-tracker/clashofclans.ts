import type { NextApiHandler } from "next";
import Util from "@util/index";
import type { APIClan, APIPlayer } from "clashofclans.js";

const ClashOfClansStatsTracker: NextApiHandler = async (req, res) => {
    const tag = Util.validateTag(req.body.tag);
    const element = req.body.element as "clans" | "players";
    const client = await Util.getCoCAPI();
    try {
        if (element == "players") {
            const response = await client.rest.getPlayer(tag);
            if (!response.ok) return Util.ApiHandler.sendError(res, 0, {
                errorMessage: "Couldn't find the player!",
                redirectUrl: "/stats-tracker#clashofclans"
            });
            Util.ApiHandler.sendSuccess<{
                player: APIPlayer
            }>(res, {
                player: response.data
            });
        } else {
            const response = await client.rest.getClan(tag);
            if (!response.ok) return Util.ApiHandler.sendError(res, 0, {
                errorMessage: "Couldn't find the clan!",
                redirectUrl: "/stats-tracker#clashofclans"
            });
            Util.ApiHandler.sendSuccess<{
                clan: APIClan
            }>(res, {
                clan: response.data
            });
        };
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res, 1, {
            redirectUrl: "/stats-tracker#clashofclans"
        });
    };
};

export default ClashOfClansStatsTracker;