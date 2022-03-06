import Layout from "@components/Layout";
import { NextPageWithConfiguration } from "@util/types";
import Util from "@util/index";
import { APIClan, APIPlayer } from "clashofclans.js";
import ClashOfClansPlayerProfile from "@modules/ClashOfClansPlayerProfile";
import { useState } from "react";
import Button from "@components/Button";
import Center from "@components/Center";

const ClashOfClansStatsTracker: NextPageWithConfiguration<{}, {}, {
    player?: APIPlayer,
    clan?: APIClan
}> = ({ data }) => {
    const { player, clan } = data;
    const [village, setVillage] = useState<"home" | "builder">("home");
    function switchVillage() {
        return () => {
            setVillage(village == "home" ? "builder" : "home");
        };
    };
    if (player) return (
        <Layout title={`${player.name} - Clash of Clans - Stats Tracker`} description={player.tag} header={player.name}>
            {village == "home" ? <ClashOfClansPlayerProfile player={player} village="home"/> : 
            <ClashOfClansPlayerProfile player={player} village="builder"/>}
            <Center>
                <Button style={{ backgroundColor: "blue" }} onClick={() => {
                    setVillage(village == "home" ? "builder" : "home")
                }}> Switch to {village == "home" ? "Builder Base" : "Home Village"} </Button>
            </Center>
        </Layout>
    );
    else return (
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