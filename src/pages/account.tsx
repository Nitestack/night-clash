import { ClashOfClansPlayerProfile, ClashOfClansClanProfile, ClashRoyaleClanProfile, ClashRoyalePlayerProfile, BrawlStarsClubProfile, BrawlStarsPlayerProfile } from "@models/user";
import { useNextPageFetchData} from "@util/hooks";
import { useTitle, useDescription, useHeader } from "@util/hooks";
import AccountDashboard from "@modules/AccountDashboard";

export type AccountPageDataType = {
    clashOfClansVillages: Array<ClashOfClansPlayerProfile>,
    clashOfClansStatsTrackerPlayers: Array<ClashOfClansPlayerProfile>,
    clashOfClansStatsTrackerClans: Array<ClashOfClansClanProfile>,
    clashRoyaleStatsTrackerPlayers: Array<ClashRoyalePlayerProfile>,
    clashRoyaleStatsTrackerClans: Array<ClashRoyaleClanProfile>,
    brawlStarsStatsTrackerPlayers: Array<BrawlStarsPlayerProfile>,
    brawlStarsStatsTrackerClans: Array<BrawlStarsClubProfile>
};


const AccountPage = useNextPageFetchData<AccountPageDataType>(({ data }) => {
    //Layout hooks
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    const { setHeader } = useHeader();
    //Page Information
    setTitle("Account");
    setHeader("My Account");
    setDescription("Access your saved data or edit your credentials!");
    return (
        <AccountDashboard data={data}/>
    );
}, {
    key: "key",
    method: "post",
    url: "/api/user/profile",
    setData: (router, user) => {
        return {
            uid: user?.uid
        }
    }
});
AccountPage.authenticationRequired = true;

export default AccountPage;