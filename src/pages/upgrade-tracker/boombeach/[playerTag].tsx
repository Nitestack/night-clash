import type { NextPageWithConfiguration } from "@util/types";
import Util from "@util/index";
import Layout from "@components/Layout/index";
import type { BoomBeachIsland } from "@models/boombeach";

const BBUpgradeTrackerPlayer: NextPageWithConfiguration<{}, {}, {
    island: BoomBeachIsland
}> = ({ data }) => {
    const { island } = data;
    return (
        <Layout description={island.playerTag}>

        </Layout>
    );
};
BBUpgradeTrackerPlayer.disableLayout = true;
BBUpgradeTrackerPlayer.authenticationRequired = true;
BBUpgradeTrackerPlayer.queryRequired = true;
BBUpgradeTrackerPlayer.afterAuthentication = function (session, router) {
    const playerTag = router.query.playerTag as string;
    //Ensures the player tag parameter was given
    if (!playerTag) {
        router.push("/upgrade-tracker/boombeach");
        return false;
    };
};
BBUpgradeTrackerPlayer.fetchData = {
    url: "/api/upgrade-tracker/boombeach/island",
    data: (data) => {
        return {
            playerTag: data.resolvedTag,
            user: data.user
        };
    },
    parseData: (router, user) => {
        return {
            resolvedTag: Util.validateTag(router.query.playerTag as string),
            user: user
        };
    },
    method: "post"
};

export default BBUpgradeTrackerPlayer;