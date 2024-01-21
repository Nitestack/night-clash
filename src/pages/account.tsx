import { ClashOfClansPlayerProfile, ClashOfClansClanProfile, ClashRoyaleClanProfile, ClashRoyalePlayerProfile, BrawlStarsClubProfile, BrawlStarsPlayerProfile } from "@graphql/types";
import { useNextPageFetchData} from "@util/hooks";
import { useTitle, useDescription, useHeader } from "@util/hooks";
import AccountDashboard from "@modules/AccountDashboard";

export type AccountPageDataType = Readonly<{
    clashOfClansVillages: Array<ClashOfClansPlayerProfile>,
    clashOfClansStatsTrackerPlayers: Array<ClashOfClansPlayerProfile>,
    clashOfClansStatsTrackerClans: Array<ClashOfClansClanProfile>,
    clashRoyaleStatsTrackerPlayers: Array<ClashRoyalePlayerProfile>,
    clashRoyaleStatsTrackerClans: Array<ClashRoyaleClanProfile>,
    brawlStarsStatsTrackerPlayers: Array<BrawlStarsPlayerProfile>,
    brawlStarsStatsTrackerClans: Array<BrawlStarsClubProfile>
}>;


const AccountPage = useNextPageFetchData<AccountPageDataType, { uid: string }>(({ data }) => {
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
    setKey: () => "accountGetProfileById",
    setQuery: (gql) => gql`
    query($uid: String!) {
        accountGetProfileById(uid: $uid) {
            boomBeachIslands {
                playerTag
                name
                expLevel
            }
            clashOfClansVillages {
                name
                tag
                townHallLevel
                townHallWeaponLevel
                clan {
                  iconUrl
                  name
                  tag
                }
            }
            clashOfClansStatsTrackerPlayers {
                name
                tag
                townHallLevel
                townHallWeaponLevel
                clan {
                    name
                    tag
                    iconUrl
                }
            }
            clashOfClansStatsTrackerClans {
                name
                tag
                iconUrl
            }
            brawlStarsStatsTrackerClans {
                name
                tag
            }
            brawlStarsStatsTrackerPlayers {
                name
                tag
                iconId
                club {
                    name
                    tag
                }
            }
            clashRoyaleStatsTrackerPlayers {
                name
                tag
                expLevel
                clan {
                    name
                    tag
                    badgeId
                }
            }
            clashRoyaleStatsTrackerClans {
                name
                tag
                badgeId
            }
        }
    }
    `,
    setOptions: (router, user) => ({
        variables: {
            uid: user.uid
        }
    })
});
AccountPage.authenticationRequired = true;

export default AccountPage;