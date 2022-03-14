import Layout from "@components/Layout/index";
import type { NextPageWithConfiguration } from "@util/types";
import Util from "@util/index";
import type { APIClan, APIPlayer } from "clashofclans.js";
import ClashOfClansPlayerProfile from "@modules/ClashOfClansPlayerProfile";
import ClashOfClansOverview from "@modules/ClashOfClansOverview";
import Tabs from "@components/Tabs";
import ClashOfClansClanProfile from "@modules/ClashOfClansClanProfile";

const ClashOfClansStatsTracker: NextPageWithConfiguration<{}, {}, {
    player?: APIPlayer,
    clan?: APIClan
}> = ({ data }) => {
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
};
ClashOfClansStatsTracker.disableLayout = true;
ClashOfClansStatsTracker.queryRequired = true;
ClashOfClansStatsTracker.afterAuthentication = (session, router) => {
    const playerTag = router.query.tag as string;
    const element = router.query.element as string;
    //Ensures the player tag parameter was given
    if (!playerTag) {
        router.push("/stats-tracker");
        return false;
    };
    //Ensures the element paramenter is given
    if (!element) {
        router.push("/stats-tracker");
        return false;
    };
    //Ensures element is either "players", "clans" or "clubs"
    if (!["players", "clans", "clubs"].includes(element)) {
        router.push("/stats-tracker");
        return false;
    };
};
ClashOfClansStatsTracker.fetchData = {
    url: "/api/stats-tracker/clashofclans",
    method: "post",
    data: (data) => {
        return {
            tag: data.resolvedTag,
            element: data.element
        };
    },
    parseData: (router, user) => {
        return {
            resolvedTag: Util.validateTag(router.query.tag as string),
            element: router.query.element
        };
    }
};

export default ClashOfClansStatsTracker;