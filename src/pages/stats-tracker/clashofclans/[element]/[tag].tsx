import Layout from "@components/Layout";
import { NextPageWithConfiguration } from "@util/types";
import Util from "@util/index";

const ClashOfClansStatsTracker: NextPageWithConfiguration = () => {
    return (
        <Layout>

        </Layout>
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