import Layout from "@components/Layout/index";
import Util from "@util/index";
import type { APIClan, APIPlayer } from "clashofclans.js";
import ClashOfClansPlayerProfile from "@modules/ClashOfClansPlayerProfile";
import ClashOfClansOverview from "@modules/ClashOfClansOverview";
import Tabs from "@components/Tabs";
import ClashOfClansClanProfile from "@modules/ClashOfClansClanProfile";
import { useNextPageFetchData } from "@util/hooks";

const ClashOfClansStatsTracker = useNextPageFetchData<{
    player: APIPlayer,
    clan: APIClan
}>(({ data }) => {
    const { player, clan } = data;
    const stats = ["home", "builder"];
    if ((!location.hash || !stats.includes(location.hash.replace(/#/g, "")))&& player) location.hash = `#${stats[0]}`;
    if ((!location.hash || !["info", "stats"].includes(location.hash.replace(/#/g, "")))&& clan) location.hash = `#info`;
    const defaultIndex = stats.indexOf(location.hash.replace(/#/g, ""));
    if (player) return (
        <Layout title={`${player.name} - Player - Clash of Clans - Stats Tracker`} description={player.tag} header={player.name}>
            <Tabs 
            tabs={{
                "Home Village": <>
                    <ClashOfClansPlayerProfile player={player} village="home"/>
                    <ClashOfClansOverview player={player} village="home"/>
                </>,
                "Builder Base": <>
                    <ClashOfClansPlayerProfile player={player} village="builder"/>
                    <ClashOfClansOverview player={player} village="builder"/>
                </>
            }} 
            initialTabIndex={defaultIndex}
            onTabChange={(index) => location.hash = `#${stats[index]}`}/>
        </Layout>
    );
    else if (clan) return (
        <Layout title={`${clan.name} - Clan - Clash of Clans - Stats Tracker`} description={clan.tag} header={clan.name}>
            <ClashOfClansClanProfile clan={clan}/>
        </Layout>
    );
    else return (
        <></>
    );
}, {
    key: "stats",
    url: "/api/stats-tracker/clashofclans",
    method: "post",
    setData: (router, user) => {
        return {
            tag: Util.validateTag(router.query.tag as string),
            element: router.query.element
        };
    }
});
ClashOfClansStatsTracker.disableLayout = true;
ClashOfClansStatsTracker.afterAuthentication = (router, user) => {
    const playerTag = router.query.tag as string;
    const element = router.query.element as string;
    //Ensures the player tag parameter was given
    if (!playerTag) return router.push("/stats-tracker");
    //Ensures the element paramenter is given
    if (!element) return router.push("/stats-tracker");
    //Ensures element is either "players", "clans" or "clubs"
    if (!["players", "clans"].includes(element)) return router.push("/stats-tracker");
};

export default ClashOfClansStatsTracker;