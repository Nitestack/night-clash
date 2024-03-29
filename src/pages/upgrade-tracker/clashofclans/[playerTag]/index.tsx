import Layout from "@components/Layout/index";
import Util from "@util/index";
import type { ClashOfClansVillage } from "prisma/clashofclans";
import Modal from "@components/Modal";
import Select from "@components/Elements/Select";
import { FC, OptionHTMLAttributes, useEffect } from "react";
import { useState, useRef } from "react";
import Center from "@components/Utilities/Center";
import Tabs from "@components/Tabs";
import Button from "@components/Elements/Button";
import Grid from "@components/Utilities/Grid";
import PlayerProfile from "@modules/ClashOfClansPlayerProfile";
import Overview from "@modules/ClashOfClansOverview";
import ClashOfClansModule from "@modules/Upgrade Tracker/ClashOfClansModule";
import ClashOfClansWallModule from "@modules/Upgrade Tracker/ClashOfClansWallModule";
import { useNextPageFetchData, useTitle, useDescription, useHeader } from "@util/hooks";

const CocUpgradeTrackerPlayerVillagePage = useNextPageFetchData<{
    playerSchema: ClashOfClansVillage
}>(({ data }) => {
    //Player Data
    const { playerSchema } = data;
    const { player } = playerSchema;
    const { name, tag, builderHallLevel } = player;
    //Page Info
    const villages = ["home", "builder"];
    if (!villages.includes(location.hash.replace(/#/g, ""))) location.hash = `#${villages[0]}`;
    const initialVillage = location.hash.replace(/#/g, "");
    //Layout hooks
    const { setDescription } = useDescription();
    const { setHeader } = useHeader();
    const { setTitle } = useTitle();
    //Page info
    setHeader(`${name} - ${initialVillage == "home" ? "Home Village" : "Builder Base"}`);
    setTitle(`${name} - ${initialVillage == "home" ? "Home Village" : "Builder Base"} - Clash of Clans - Upgrade Tracker`);
    setDescription(tag);
    //Village Tabs
    const villageTabs: {
        [key: string]: JSX.Element;
    } = {
        "Home Village": <CocUpgradeTrackerPlayerVillage village="home" playerSchema={playerSchema}/>
    };
    if (builderHallLevel) villageTabs["Builder Base"] = <CocUpgradeTrackerPlayerVillage village="builder" playerSchema={playerSchema}/>;
    function changeVillage(index: number) {
        setHeader(`${name} - ${villages[index] == "home" ? "Home Village" : "Builder Base"}`);
        setTitle(`${name} - ${villages[index] == "home" ? "Home Village" : "Builder Base"} - Clash of Clans - Upgrade Tracker`);
        location.href = `#${villages[index]}`;
    };
    return (
        <Tabs tabs={villageTabs} initialTabIndex={villages.indexOf(initialVillage)} onTabChange={(index) => changeVillage(index)}/>
    );
}, {
    key: "coc-upgrade-tracker-player-village",
    url: "/api/upgrade-tracker/clashofclans/village",
    setData: (router, user) => {
        return {
            playerTag: Util.validateTag(router.query.playerTag as string),
            user: user
        };
    },
    method: "post"
});

const CocUpgradeTrackerPlayerVillage: FC<{
    village: "home" | "builder",
    playerSchema: ClashOfClansVillage
}> = ({ village, playerSchema }) => {
    const { player, builderSeasonBoost, researchSeasonBoost, homeVillage } = playerSchema;
    const { tag, townHallLevel, builderHallLevel } = player;
    //Season Boost
    const [researchBoost, setResearchBoost] = useState<number>(researchSeasonBoost);
    const [builderBoost, setBuilderBoost] = useState<number>(builderSeasonBoost);
    const builderBoostRef = useRef<HTMLSelectElement>(null);
    const researchBoostRef = useRef<HTMLSelectElement>(null);
    const [showSeasonBoostModal, setShowSeasonBoostModal] = useState(false);
    const [seasonBoostModalLoading, setSeasonBoostModalLoading] = useState(false);
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

    function openSeasonBoostModal() {
        return () => {
            setShowSeasonBoostModal(true);
        };
    };

    function closeSeasonBoostModal() {
        return () => {
            setShowSeasonBoostModal(false);
        };
    };

    function setSeasonBoosts() {
        return async () => {
            const newBuilderBoost = builderBoostRef.current?.value as string;
            const newResearchBoost = researchBoostRef.current?.value as string;
            setSeasonBoostModalLoading(true);
            await Util.ApiHandler.clientSideErrorHandler(async () => {
                const response = await Util.Axios.post("/api/upgrade-tracker/clashofclans/seasonboost", {
                    playerTag: tag,
                    builderBoost: newBuilderBoost,
                    researchBoost: newResearchBoost
                });
                if (response.status == 200) {
                    setBuilderBoost(parseInt(newBuilderBoost.replace(/%/g, "")));
                    setResearchBoost(parseInt(newResearchBoost.replace(/%/g, "")));
                    setSeasonBoostModalLoading(false);
                    closeSeasonBoostModal();
                    Util.toast.success("Successfully set season boosts!");
                };
            });
        };
    };

    function updatePlayer() {
        return async () => {
            await Util.ApiHandler.clientSideErrorHandler(async () => {
                const response = await Util.Axios.post("/api/upgrade-tracker/clashofclans/apiupdate", {
                    playerTag: tag,
                    village: village
                });
                if (response.status == 200) {
                    Util.toast.success("Successfully updated the player!");
                    location.reload();
                };
            });
        };
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
                    <Button className="bg-green-500" onClick={updatePlayer()}>API Update</Button>
                </div>
                <a style={{ textDecoration: "none" }} href={`/upgrade-tracker/clashofclans/${tag.replace(/#/g, "")}/editstructures/${village}`}>
                    <Button className="bg-red-600"> Edit Structures</Button>
                </a>
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
                        <Button className="w-full" onClick={openSeasonBoostModal()}> Set Season Boosts </Button>
                        <Modal
                            show={showSeasonBoostModal}
                            loading={seasonBoostModalLoading}
                            onModalClose={closeSeasonBoostModal()}
                            title="Season Boosts"
                            description="Set season boosts by selecting the percentage for each category"
                            onSubmit={setSeasonBoosts()}>
                            <div className="grid grid-Columns-2">
                                <div className="justify-center">
                                    <Center>
                                        <img className="w-20" src="/Images/Clash of Clans/Season Boost Builder.png"/>
                                    </Center>
                                    <Select ref={builderBoostRef} defaultValue={builderBoost} options={getSeasonBoostPercentages()}/>
                                </div>
                                <div className="justify-center">
                                    <Center>
                                        <img className="w-20" src="/Images/Clash of Clans/Season Boost Research.png"/>
                                    </Center>
                                    <Select ref={researchBoostRef} defaultValue={researchBoost} options={getSeasonBoostPercentages()}/>
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
CocUpgradeTrackerPlayerVillagePage.authenticationRequired = true;
CocUpgradeTrackerPlayerVillagePage.afterAuthentication = (router, user) => {
    const playerTag = router.query.playerTag as string;
    //Ensures the player tag parameter was given
    if (!playerTag) return router.push("/upgrade-tracker/clashofclans");
};

export default CocUpgradeTrackerPlayerVillagePage;