import type { FC } from "react";
import { AccountPageDataType } from "@pages/account";
import type { ClashOfClansPlayerProfile, ClashOfClansClanProfile, ClashRoyaleClanProfile, BrawlStarsClubProfile } from "@models/user";
import Util from "@util/index";
import Information from "@modules/AccountDashboard/Information";
import ClashRoyaleData from "@modules/AccountDashboard/ClashRoyale";
import ClashOfClansData from "@modules/AccountDashboard/ClashOfClans";
import BrawlStarsData from "@modules/AccountDashboard/BrawlStars";

const AccountDashboard: FC<{ data: AccountPageDataType }> = ({ data }) => {
    //Data of the user
    const { clashOfClansVillages, clashOfClansStatsTrackerClans, clashOfClansStatsTrackerPlayers, clashRoyaleStatsTrackerClans, clashRoyaleStatsTrackerPlayers, brawlStarsStatsTrackerClans, brawlStarsStatsTrackerPlayers } = data;
    //Clash of Clans
    for (const player of [...clashOfClansVillages, ...clashOfClansStatsTrackerPlayers]) {
        if (player.clan) clashOfClansStatsTrackerClans.push(player.clan);
    };
    const newClashOfClansStatsTrackerClans: Array<ClashOfClansClanProfile> = Util.removeDuplicates(clashOfClansStatsTrackerClans);
    const newClashOfClansStatsTrackerPlayers: Array<ClashOfClansPlayerProfile> = Util.removeDuplicates([...clashOfClansStatsTrackerPlayers, ...clashOfClansVillages]);
    //Clash Royale
    for (const player of clashRoyaleStatsTrackerPlayers) {
        if (player.clan) clashRoyaleStatsTrackerClans.push(player.clan);
    };
    const newClashRoyaleStatsTrackerClans: Array<ClashRoyaleClanProfile> = Util.removeDuplicates(clashRoyaleStatsTrackerClans);
    //Brawl Stars
    for (const player of brawlStarsStatsTrackerPlayers) {
        if (player.club) brawlStarsStatsTrackerClans.push(player.club);
    };
    const newBrawlStarsStatsTrackerClans: Array<BrawlStarsClubProfile> = Util.removeDuplicates(brawlStarsStatsTrackerClans);
    return (
        <div className="bg-lightmodeprimary dark:bg-darkmodeprimary shadow overflow-hidden rounded-lg">
            <Information/>
            <ClashOfClansData 
            villages={clashOfClansVillages}
            clans={newClashOfClansStatsTrackerClans}
            players={newClashOfClansStatsTrackerPlayers}
            />
            <ClashRoyaleData 
            clans={newClashRoyaleStatsTrackerClans}
            players={clashRoyaleStatsTrackerPlayers}
            />
            <BrawlStarsData
            players={brawlStarsStatsTrackerPlayers}
            clubs={newBrawlStarsStatsTrackerClans}
            />
        </div>
    );
};
export default AccountDashboard;