import Layout from "@components/Layout";
import type { NextPageWithConfiguration } from "@util/types";
import Util from "@util/index";
import type { ClashOfClansVillage } from "@models/clashofclans";
import Modal from "@components/Modal";
import $ from "jquery";
import Select from "@components/Select";
import type { FC, OptionHTMLAttributes } from "react";
import { useState } from "react";
import Center from "@components/Center";
import Tabs from "@components/Tabs";
import Button from "@components/Button";
import Link from "@components/Link";
import Grid from "@components/Grid";
import PlayerProfile from "@modules/ClashOfClansPlayerProfile";
import Overview from "@modules/ClashOfClansOverview";
import ClashOfClansModule from "@modules/Upgrade Tracker/ClashOfClansModule";
import ClashOfClansWallModule from "@modules/Upgrade Tracker/ClashOfClansWallModule";

const CocUpgradeTrackerPlayerVillagePage: NextPageWithConfiguration<{}, {}, {
    playerSchema: ClashOfClansVillage & { _id: any };
}> = ({ data }) => {
    //Player Data
    const { playerSchema } = data;
    //Page Info
    const villages = ["home", "builder"];
    if (!villages.includes(location.hash.replace(/#/g, ""))) location.hash = `#${villages[0]}`;
    const initialVillage = location.hash.replace(/#/g, "");
    const [header, setHeader] = useState(`${playerSchema.player.name} - ${initialVillage == "home" ? "Home Village" : "Builder Base"}`);
    const [title, setTitle] = useState(`${playerSchema.player.name} - ${initialVillage == "home" ? "Home Village" : "Builder Base"} - Clash of Clans - Upgrade Tracker`);
    //Village Tabs
    const villageTabs: {
        [key: string]: JSX.Element;
    } = {
        "Home Village": <CocUpgradeTrackerPlayerVillage village="home" playerSchema={playerSchema}/>
    };
    if (playerSchema.player.builderHallLevel) villageTabs["Builder Base"] = <CocUpgradeTrackerPlayerVillage village="builder" playerSchema={playerSchema}/>;
    function changeVillage(index: number) {
        setHeader(`${playerSchema.player.name} - ${villages[index] == "home" ? "Home Village" : "Builder Base"}`);
        setTitle(`${playerSchema.player.name} - ${villages[index] == "home" ? "Home Village" : "Builder Base"} - Clash of Clans - Upgrade Tracker`);
        location.href = `#${villages[index]}`;
    };
    return (
        <Layout header={header} description={playerSchema.playerTag} title={title}>
            <Tabs tabs={villageTabs} initialTabIndex={villages.indexOf(initialVillage)} 
            onTabChange={(index) => changeVillage(index)}/>
        </Layout>
    );
};
const CocUpgradeTrackerPlayerVillage: FC<{
    village: "home" | "builder",
    playerSchema: ClashOfClansVillage
}> = ({ village, playerSchema }) => {
    const { player, builderSeasonBoost, researchSeasonBoost, homeVillage } = playerSchema;
    const { tag, townHallLevel, builderHallLevel, townHallWeaponLevel } = player;
    //Season Boost
    const [researchBoost, setResearchBoost] = useState<number>(researchSeasonBoost);
    const [builderBoost, setBuilderBoost] = useState<number>(builderSeasonBoost);
    //Tabs
    const tabs: { [key: string]: JSX.Element; } = {};
    tabs.Overview = <Overview village={village} player={player}/>;
    tabs.Defenses = (
        <ClashOfClansModule playerSchema={playerSchema} type="Defense" village={village}/>
    );
    //@ts-ignore
    if ((village == "home" && townHallLevel >= 3) || (village == "builder" && builderHallLevel >= 2)) {
        tabs.Traps = (
            <ClashOfClansModule playerSchema={playerSchema} type="Trap" village={village}/>
        );
    };
    tabs.Resources = (
        <ClashOfClansModule playerSchema={playerSchema} type="Resource" village={village}/>
    );
    tabs.Walls = (
        <ClashOfClansWallModule playerSchema={playerSchema} village={village}/>
    );
    tabs.Army = (
        <ClashOfClansModule playerSchema={playerSchema} type="Army" village={village}/>
    );
    if ((village == "home" && townHallLevel >= 3) || (village == "builder")) {
        tabs.Troops = (
            <ClashOfClansModule playerSchema={playerSchema} type="Troop" village={village}/>
        );
        if (village == "home") {
            if (townHallLevel >= 7) {
                tabs["Dark Troops"] = (
                    <ClashOfClansModule playerSchema={playerSchema} type="Dark Troop" village={village}/>
                );
            };
            if (townHallLevel >= 5) {
                tabs.Spells = (
                    <ClashOfClansModule playerSchema={playerSchema} type="Spell" village={village}/>
                );
            };
            if (townHallLevel >= 12) {
                tabs["Siege Machines"] = (
                    <ClashOfClansModule playerSchema={playerSchema} type="Siege Machine" village={village}/>
                );
            };
        };
    };
    //@ts-ignore
    if ((village == "home" && townHallLevel >= 7) || (village == "builder" && builderHallLevel >= 5)) {
        tabs.Heroes = (
            <ClashOfClansModule playerSchema={playerSchema} type="Hero" village={village}/>
        );
    };
    if (village == "home" && townHallLevel >= 14) {
        tabs.Pets = (
            <ClashOfClansModule playerSchema={playerSchema} type="Pet" village={village}/>
        );
    };
    tabs.Builder = (
        <></>
    );
    if ((village == "home" && townHallLevel >= 3) || (village == "builder")) {
        tabs.Laboratory = (
            <></>
        );
    };
    if (village == "home" && townHallLevel >= 14) {
        tabs["Pet House"] = (
            <></>
        );
    };
    tabs.Stats = (
        <></>
    );

    function getSeasonBoostPercentages() {
        const seasonBoosts: Array<OptionHTMLAttributes<HTMLOptionElement>> = [];
        for (const i of [0, 10, 15, 20]) {
            const optionObject: OptionHTMLAttributes<HTMLOptionElement> = {
                children: `${i}%`,
                value: i,
            };
            seasonBoosts.push(optionObject);
        };
        return seasonBoosts;
    };

    return (
        <Grid className="max-w-none grid-cols-3">
            <div className="col-span-3">
                <PlayerProfile player={player} village={village}/>    
            </div>
            <div className="col-span-3">
                {village == "home" || (village == "builder" && builderHallLevel && builderHallLevel >= 4) ? <>
                {village == "home" ? 
                <Center>
                    <Center>
                        <Button>
                            <img className="w-28" src="/Images/Clash of Clans/Magic Items/Builder Potion Button.png"/>
                        </Button>
                    </Center>
                    <Center>
                        {homeVillage.Laboratory1 ? <Button>
                            <img className="w-28" src="/Images/Clash of Clans/Magic Items/Research Potion Button.png"/>
                        </Button> : undefined}
                    </Center>
                </Center> : 
                <Center>
                    <Center>
                        <Button>
                            <img className="w-28" src="/Images/Clash of Clans/Magic Items/Clock Tower Boost.png"/>
                        </Button>
                    </Center>
                    <Center>
                        <Button>
                            <img className="w-28" src="/Images/Clash of Clans/Magic Items/Clock Tower Potion Button.png"/>
                        </Button>
                    </Center>
                </Center>}
                </> : undefined}
            </div>
            <Grid className="col-span-3 grid-cols-1 sm:grid-cols-2 justify-items-center">
                <div>
                    <Button className="bg-green-500" onClick={() => {
                        Util.jqueryAjax("/api/upgrade-tracker/clashofclans/apiupdate", {
                            method: "POST",
                            data: {
                                playerTag: tag,
                                village: village
                            },
                            success: ({ success }) => {
                                if (success) location.reload();
                            }
                        });
                    }}>API Update</Button>
                </div>
                <Link>
                    <Button className="bg-red-600"> Edit Structures</Button>
                </Link>
            </Grid>
            {townHallLevel >= 7 ? (
                <Grid className="grid-cols-2 col-span-3">
                    <div className="border border-solid border-[#281303] rounded-md bg-[linear-gradient(#C5792B,_#FAC40D)]">
                        <Center>
                            <img src="/Images/Clash of Clans/Season Boost Builder.png"/>
                        </Center>
                        <h5 className="text-center"> Builder Boost </h5>
                        <h1 className="text-center font-coc-description"> {builderBoost}% </h1>
                    </div>
                    <div className="border border-solid border-[#281303] rounded-md bg-[linear-gradient(#C5792B,_#FAC40D)]">
                        <Center>
                            <img src="/Images/Clash of Clans/Season Boost Research.png"/>
                        </Center>
                        <h5 className="text-center"> Research Boost </h5>
                        <h1 className="text-center font-coc-description"> {researchBoost}% </h1>
                    </div>
                    <div className="col-span-2">
                        <Modal
                            openButtonOptions={{ children: "Set Season Boosts", style: { backgroundColor: "blue", width: "100%" } }}
                            title="Season Boosts"
                            description="Set season boosts by selecting the percentage for each category"
                            onSubmit={(ev) => {
                                const newBuilderBoost = $("#builderBoost").val() as string;
                                const newResearchBoost = $("#researchBoost").val() as string;
                                Util.jqueryAjax("/api/upgrade-tracker/clashofclans/seasonboost", {
                                    method: "POST",
                                    data: {
                                        playerTag: tag,
                                        builderBoost: newBuilderBoost,
                                        researchBoost: newResearchBoost,
                                    },
                                    success: () => {
                                        setBuilderBoost(parseInt(newBuilderBoost.replace(/%/g, "")));
                                        setResearchBoost(parseInt(newResearchBoost.replace(/%/g, "")));
                                    }
                                });
                            }}>
                            <div className="grid grid-Columns-2">
                                <div className="justify-center">
                                    <Center>
                                        <img className="w-20" src="/Images/Clash of Clans/Season Boost Builder.png"/>
                                    </Center>
                                    <Select id="builderBoost" defaultValue={builderBoost} options={getSeasonBoostPercentages()}/>
                                </div>
                                <div className="justify-center">
                                    <Center>
                                        <img className="w-20" src="/Images/Clash of Clans/Season Boost Research.png"/>
                                    </Center>
                                    <Select id="researchBoost" defaultValue={researchBoost} options={getSeasonBoostPercentages()}/>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </Grid>
            ) : undefined}
            <div className="col-span-3">
                <Tabs tabs={tabs}/>
            </div>
        </Grid>
    );
};

CocUpgradeTrackerPlayerVillagePage.disableLayout = true;
CocUpgradeTrackerPlayerVillagePage.authenticationRequired = true;
CocUpgradeTrackerPlayerVillagePage.queryRequired = true;
CocUpgradeTrackerPlayerVillagePage.afterAuthentication = function (session, router) {
    const playerTag = router.query.playerTag as string;
    //Ensures the player tag parameter was given
    if (!playerTag) {
        router.push("/upgrade-tracker/clashofclans");
        return false;
    };
};
CocUpgradeTrackerPlayerVillagePage.fetchData = {
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

export default CocUpgradeTrackerPlayerVillagePage;