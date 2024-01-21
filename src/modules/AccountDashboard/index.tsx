import type { FC } from "react";
import { AccountPageDataType } from "@pages/account";
import type { ClashOfClansPlayerProfile, ClashOfClansClanProfile, ClashRoyaleClanProfile, BrawlStarsClubProfile } from "@graphql/types";
import Util from "@util/index";
import Information from "@modules/AccountDashboard/Information";
import ClashRoyaleData from "@modules/AccountDashboard/ClashRoyale";
import ClashOfClansData from "@modules/AccountDashboard/ClashOfClans";
import BrawlStarsData from "@modules/AccountDashboard/BrawlStars";

const AccountDashboard: FC<{ data: AccountPageDataType }> = ({ data }) => {
    //Data of the user
    const { 
        clashOfClansVillages, 
        clashOfClansStatsTrackerClans: oldClashOfClansStatsTrackerClans, 
        clashOfClansStatsTrackerPlayers: oldClashOfClansStatsTrackerPlayers, 
        clashRoyaleStatsTrackerClans: oldClashRoyaleStatsTrackerClans, 
        clashRoyaleStatsTrackerPlayers, 
        brawlStarsStatsTrackerClans: oldBrawlStarsStatsTrackerClans, 
        brawlStarsStatsTrackerPlayers 
    } = data;
    //Clash of Clans
    const clashOfClansStatsTrackerClans = Array.from(oldClashOfClansStatsTrackerClans);
    for (const player of [...clashOfClansVillages, ...oldClashOfClansStatsTrackerPlayers]) {
        if (player.clan) clashOfClansStatsTrackerClans.push(player.clan);
    };
    const newClashOfClansStatsTrackerClans: Array<ClashOfClansClanProfile> = Util.removeDuplicates(clashOfClansStatsTrackerClans);
    const newClashOfClansStatsTrackerPlayers: Array<ClashOfClansPlayerProfile> = Util.removeDuplicates([...oldClashOfClansStatsTrackerPlayers, ...clashOfClansVillages]);
    //Clash Royale
    const clashRoyaleStatsTrackerClans = Array.from(oldClashRoyaleStatsTrackerClans);
    for (const player of clashRoyaleStatsTrackerPlayers) {
        if (player.clan) clashRoyaleStatsTrackerClans.push(player.clan);
    };
    const newClashRoyaleStatsTrackerClans: Array<ClashRoyaleClanProfile> = Util.removeDuplicates(clashRoyaleStatsTrackerClans);
    //Brawl Stars
    const brawlStarsStatsTrackerClans = Array.from(oldBrawlStarsStatsTrackerClans);
    for (const player of brawlStarsStatsTrackerPlayers) {
        if (player.club) brawlStarsStatsTrackerClans.push(player.club);
    };
    const newBrawlStarsStatsTrackerClans: Array<BrawlStarsClubProfile> = Util.removeDuplicates(brawlStarsStatsTrackerClans);
    return (
        <div className="bg-lightmodeprimary dark:bg-darkmodeprimary shadow overflow-hidden rounded-lg">
            <Information/>
            <ClashOfClansData 
            villages={clashOfClansVillages}
            players={newClashOfClansStatsTrackerPlayers}
            clans={newClashOfClansStatsTrackerClans}
            />
            <ClashRoyaleData 
            players={clashRoyaleStatsTrackerPlayers}
            clans={newClashRoyaleStatsTrackerClans}
            />
            <BrawlStarsData
            players={brawlStarsStatsTrackerPlayers}
            clubs={newBrawlStarsStatsTrackerClans}
            />
        </div>
    );
};
export default AccountDashboard;