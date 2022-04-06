import type { NextApiHandler } from "next";
import Util from "@util/index";
import DatabaseManager from "@util/databaseManager";
import { ClashOfClansClanProfile, ClashOfClansPlayerProfile, ClashRoyalePlayerProfile, ClashRoyaleClanProfile, BrawlStarsClubProfile, BrawlStarsPlayerProfile } from "@models/user";

Util.connectDB();

const UserProfile: NextApiHandler = async (req, res) => {
    const { uid } = req.body;
    try {
        const user = await DatabaseManager.User.findOne({ uid: uid });
        if (!user) return Util.ApiHandler.sendError(res, 0, { errorMessage: "User not found!" });
        const villages: Array<ClashOfClansPlayerProfile> = [];
        for (const clashOfClansVillage of user.clashOfClansVillages) {
            const village = await DatabaseManager.getClashOfClansVillageById(clashOfClansVillage);
            if (village) {
                const pushObject: ClashOfClansPlayerProfile = {
                    name: village.player.name,
                    tag: village.playerTag,
                    townHallLevel: village.player.townHallLevel,
                    townHallWeaponLevel: village.player.townHallWeaponLevel
                };
                if (village.player.clan) pushObject.clan = {
                    name: village.player.clan.name,
                    tag: village.player.clan.tag,
                    iconUrl: village.player.clan.badgeUrls.large
                };
                villages.push(pushObject);
            };
        };
        Util.ApiHandler.sendSuccess<{
            clashOfClansVillages: Array<ClashOfClansPlayerProfile>,
            clashOfClansStatsTrackerPlayers: Array<ClashOfClansPlayerProfile>,
            clashOfClansStatsTrackerClans: Array<ClashOfClansClanProfile>,
            clashRoyaleStatsTrackerPlayers: Array<ClashRoyalePlayerProfile>,
            clashRoyaleStatsTrackerClans: Array<ClashRoyaleClanProfile>,
            brawlStarsStatsTrackerPlayers: Array<BrawlStarsPlayerProfile>,
            brawlStarsStatsTrackerClans: Array<BrawlStarsClubProfile>
        }>(res, {
            clashOfClansVillages: villages,
            clashOfClansStatsTrackerPlayers: user.clashOfClansStatsTrackerPlayers,
            clashOfClansStatsTrackerClans: user.clashOfClansStatsTrackerClans,
            clashRoyaleStatsTrackerClans: user.clashRoyaleStatsTrackerClans,
            clashRoyaleStatsTrackerPlayers: user.clashRoyaleStatsTrackerPlayers,
            brawlStarsStatsTrackerClans: user.brawlStarsStatsTrackerClans,
            brawlStarsStatsTrackerPlayers: user.brawlStarsStatsTrackerPlayers
        });
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res);
    };
};

export default UserProfile;