import Util from "@util/index";
import type { BoomBeachIsland } from "@models/boombeach";
import { useNextPageFetchData } from "@util/hooks";
import { useDescription, useTitle, useHeader } from "@util/hooks";

const BBUpgradeTrackerPlayer = useNextPageFetchData<{
    island: BoomBeachIsland
}>(({ data }) => {
    const { name, playerTag } = data.island;
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    const { setHeader } = useHeader();
    //Layout hooks
    setTitle(`${name} - Island - Boom Beach - Upgrade Tracker`);
    setDescription(playerTag);
    setHeader(name);
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
    if (!playerTag) return router.push("/upgrade-tracker/boombeach");
};

export default BBUpgradeTrackerPlayer;