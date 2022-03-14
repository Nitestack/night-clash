import type { NextPageWithConfiguration } from "@util/types";
import Util from "@util/index";
import Layout from "@components/Layout/index";
import type { ClashOfClansVillage } from "@database/Models/clashofclans";
import { useState } from "react";
import type { FC } from "react";
import Tabs from "@components/Tabs";

const ClashOfClansEditStructuresPage: NextPageWithConfiguration<{}, {}, {
    playerSchema: ClashOfClansVillage
}> = ({ data }) => {
    const { playerSchema } = data;
    const { player } = playerSchema;
    const { tag, name } = player;
    //Page Info
    const villages = ["home", "builder"];
    if (!villages.includes(location.hash.replace(/#/g, ""))) location.hash = `#${villages[0]}`;
    const initialVillage = location.hash.replace(/#/g, "");
    const [header, setHeader] = useState(`${name} - Edit ${initialVillage == "home" ? "Home Village" : "Builder Base"} structures`);
    const [title, setTitle] = useState(`${name} - Edit ${initialVillage == "home" ? "Home Village" : "Builder Base"} structures - Clash of Clans - Upgrade Tracker`);
    function changeTab() {
        return (index: number) => {
            location.hash = `#${villages[index]}`;
            setTitle(`${name} - Edit ${villages[index] == "home" ? "Home Village" : "Builder Base"} structures - Clash of Clans - Upgrade Tracker`);
            setHeader(`${name} - Edit ${villages[index] == "home" ? "Home Village" : "Builder Base"} structures`);
        };
    };
    return (
        <Layout title={title} header={header} description={tag}>
            <Tabs initialTabIndex={villages.indexOf(initialVillage)} onTabChange={changeTab()} tabs={{
                "Home Village": <EditStructuresTab village="home" playerSchema={playerSchema}/>,
                "Builder Base": <EditStructuresTab village="builder" playerSchema={playerSchema}/>
            }}/>
        </Layout>
    );
};

const EditStructuresTab: FC<{ 
    village: "home" | "builder",
    playerSchema: ClashOfClansVillage
}> = ({ village, playerSchema }) => {
    const { player, homeVillage, builderBase } = playerSchema;
    return (
        <></>
    );
};

ClashOfClansEditStructuresPage.disableLayout = true;
ClashOfClansEditStructuresPage.authenticationRequired = true;
ClashOfClansEditStructuresPage.queryRequired = true;
ClashOfClansEditStructuresPage.afterAuthentication = function (session, router) {
    const playerTag = router.query.playerTag as string;
    //Ensures the player tag parameter was given
    if (!playerTag) {
        router.push("/upgrade-tracker/clashofclans");
        return false;
    };
};
ClashOfClansEditStructuresPage.fetchData = {
    url: "/api/upgrade-tracker/clashofclans/village",
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

export default ClashOfClansEditStructuresPage;