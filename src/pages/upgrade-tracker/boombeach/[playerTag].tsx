import Util from "@util/index";
import type { BoomBeachIsland } from "@models/boombeach";
import { useNextPageFetchData } from "@util/hooks";
import { useDescription, useTitle, useHeader } from "@util/hooks";

const BBUpgradeTrackerPlayer = useNextPageFetchData<{
    island: BoomBeachIsland
}>(({ data }) => {
    const { name, playerTag } = data.island;
    //Layout hooks
    useTitle(`${name} - Island - Boom Beach - Upgrade Tracker`);
    useDescription(playerTag);
    useHeader(name);
    return (
        <></>
    );
}, {
    key: "bb-upgrade-tracker-player",
    url: "/api/upgrade-tracker/boombeach/island",
    method: "post",
    setData: (router, user) => {
        return {
            playerTag: Util.validateTag(router.query.playerTag as string)
        };
    }
});
BBUpgradeTrackerPlayer.authenticationRequired = true;
BBUpgradeTrackerPlayer.afterAuthentication = function (router, user) {
    const playerTag = router.query.playerTag as string;
    //Ensures the player tag parameter was given
    if (!playerTag) {
        router.push("/upgrade-tracker/boombeach");
        return false;
    };
};

export default BBUpgradeTrackerPlayer;