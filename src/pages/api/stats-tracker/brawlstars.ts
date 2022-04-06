import type { NextApiHandler } from "next";
import Util from "@util/index";
import type { BSClan, BSProfile } from "@interfaces/brawlStars";

const BrawlStarsStatsTracker: NextApiHandler = async (req, res) => {
    const tag = req.body.tag as string;
    const element = req.body.element as "clubs" | "players";
    const client = await Util.getAPI("bs");
    try {
        if (element == "players") {
            const player = await client.player(tag);
            if (!player) return Util.ApiHandler.sendError(res, 0, {
                errorMessage: "Couldn't find the player!"
            });
            Util.ApiHandler.sendSuccess<{
                player: BSProfile
            }>(res, {
                player: player
            });
        } else {
            const clan = await client.club(tag);
            if (!clan) return Util.ApiHandler.sendError(res, 0, {
                errorMessage: "Couldn't find the club!"
            });
            Util.ApiHandler.sendSuccess<{
                clan: BSClan
            }>(res, {
                clan: clan
            });
        };
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res, 1);
    };
};

export default BrawlStarsStatsTracker;