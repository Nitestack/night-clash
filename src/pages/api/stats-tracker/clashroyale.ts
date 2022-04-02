import type { NextApiHandler } from "next";
import Util from "@util/index";
import type { CRProfile, CRClan } from "@interfaces/clashRoyale";

const ClashRoyaleStatsTracker: NextApiHandler = async (req, res) => {
    const tag = req.body.tag as string;
    const element = req.body.element as "clans" | "players";
    const client = await Util.getCRAPI();
    try {
        if (element == "players") {
            const player = await client.player(tag);
            if (!player) return Util.ApiHandler.sendError(res, 0, {
                errorMessage: "Couldn't find the player!"
            });
            Util.ApiHandler.sendSuccess<{
                player: CRProfile
            }>(res, {
                player: player
            });
        } else {
            const clan = await client.clan(tag);
            if (!clan) return Util.ApiHandler.sendError(res, 0, {
                errorMessage: "Couldn't find the clan!"
            });
            Util.ApiHandler.sendSuccess<{
                clan: CRClan
            }>(res, {
                clan: clan
            });
        };  
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res, 1);
    };
};

export default ClashRoyaleStatsTracker;