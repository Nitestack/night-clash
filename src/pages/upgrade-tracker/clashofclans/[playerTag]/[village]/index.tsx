import Layout from "@components/Layout";
import { NextPageWithConfiguration } from "@util/types";
import Util from "@util/index";
import { ClashOfClansVillage } from "@models/clashofclans";
import Modal from "@components/Modal";
import $ from "jquery";
import Select from "@components/Select";
import { OptionHTMLAttributes, useState } from "react";
import Center from "@components/Center";
import Tabs from "@components/Tabs";
import Button from "@components/Button";
import Link from "@components/Link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PlayerProfile from "@modules/ClashOfClansPlayerProfile";
import Overview from "@modules/Upgrade Tracker/cocOverview";
import Table from "@modules/Upgrade Tracker/cocTable";
import ClashOfClansWallTable from "@modules/Upgrade Tracker/cocWallTable";

const CocUpgradeTrackerPlayerVillagePage: NextPageWithConfiguration<{}, {}, {
    playerSchema: ClashOfClansVillage & { _id: any };
    village: "home" | "builder";
}> = ({ data }) => {
    const { playerSchema, village } = data;
    const [statePlayerSchema, setPlayerSchema] = useState(playerSchema);
    const { player, builderSeasonBoost, researchSeasonBoost, homeVillage } = statePlayerSchema;
    const { name, tag, townHallLevel, builderHallLevel, townHallWeaponLevel } = player;

    //Season Boost
    const [researchBoost, setResearchBoost] = useState<number>(researchSeasonBoost);
    const [builderBoost, setBuilderBoost] = useState<number>(builderSeasonBoost);

    //Tabs
    const tabs: { [key: string]: JSX.Element; } = {};
    tabs.Overview = <Overview village={village} player={player}/>;
    tabs.Defenses = (
        <Table playerSchema={statePlayerSchema} type="Defense" village={village}/>
    );
    //@ts-ignore
    if ((village == "home" && townHallLevel >= 3) || (village == "builder" && builderHallLevel >= 2)) {
        tabs.Traps = (
            <Table playerSchema={statePlayerSchema} type="Trap" village={village}/>
        );
    };
    tabs.Resources = (
        <Table playerSchema={statePlayerSchema} type="Resource" village={village}/>
    );
    tabs.Walls = (
        <ClashOfClansWallTable playerSchema={statePlayerSchema} village={village}></ClashOfClansWallTable>
    );
    tabs.Army = (
        <Table playerSchema={statePlayerSchema} type="Army" village={village}/>
    );
    if ((village == "home" && townHallLevel >= 3) || (village == "builder")) {
        tabs.Troops = (
            <Table playerSchema={statePlayerSchema} type="Troop" village={village}/>
        );
        if (village == "home") {
            if (townHallLevel >= 7) {
                tabs["Dark Troops"] = (
                    <Table playerSchema={statePlayerSchema} type="Dark Troop" village={village}/>
                );
            };
            if (townHallLevel >= 5) {
                tabs.Spells = (
                    <Table playerSchema={statePlayerSchema} type="Spell" village={village}/>
                );
            };
            if (townHallLevel >= 12) {
                tabs["Siege Machines"] = (
                    <Table playerSchema={statePlayerSchema} type="Siege Machine" village={village}/>
                );
            };
        };
    };
    //@ts-ignore
    if ((village == "home" && townHallLevel >= 7) || (village == "builder" && builderHallLevel >= 5)) {
        tabs.Heroes = (
            <Table playerSchema={statePlayerSchema} type="Hero" village={village}/>
        );
    };
    if (village == "home" && townHallLevel >= 14) {
        tabs.Pets = (
            <Table playerSchema={statePlayerSchema} type="Pet" village={village}/>
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
        <Layout
            header={`${name} - ${village == "home" ? "Home Village" : "Builder Base"}`}
            description={tag}
            title={`${name} - ${village == "home" ? "Home Village" : "Builder Base"} - Clash of Clans - Upgrade Tracker`}>
            <Container className="p-0 max-w-none">
                <PlayerProfile player={player} village={village}/>
                <Row>
                    <Center>
                        {village == "home" || (village == "builder" && builderHallLevel && builderHallLevel >= 4) ? <>
                        {village == "home" ? 
                        <>
                            <Button>
                                <img className="w-28" src="/Images/Clash of Clans/Magic Items/Builder Potion Button.png"/>
                            </Button>
                            {homeVillage.Laboratory1 ? <Button>
                                <img className="w-28" src="/Images/Clash of Clans/Magic Items/Research Potion Button.png"/>
                            </Button> : undefined}
                        </> : 
                        <>
                            <Button>
                                <img className="w-28" src="/Images/Clash of Clans/Magic Items/Clock Tower Boost.png"/>
                            </Button>
                            <Button>
                                <img className="w-28" src="/Images/Clash of Clans/Magic Items/Clock Tower Potion Button.png"/>
                            </Button>
                        </>}
                        </> : undefined}
                    </Center>
                </Row>
                <Row>
                    <Col className="p-0">
                        <Center>
                            <Button style={{ backgroundColor: "green" }} onClick={() => {
                                Util.jqueryAjax("/api/upgrade-tracker/clashofclans/apiupdate", {
                                    method: "POST",
                                    data: {
                                        playerTag: tag,
                                        village: village
                                    },
                                    success: ({ newPlayerSchema }) => {
                                        setPlayerSchema(newPlayerSchema);
                                    }
                                });
                            }}>API Update</Button>
                        </Center>
                    </Col>
                    <Col className="p-0">
                        <Center>
                            <Link>
                                <Button style={{ backgroundColor: "red" }}> Edit Structures</Button>
                            </Link> 
                        </Center>
                    </Col>
                    {builderHallLevel ? <Col className="p-0">
                        <Center>
                            <Link href={`/upgrade-tracker/clashofclans/${tag.replace(/#/g, "")}/${village == "home" ? "builder" : "home"}`}>
                                <Button style={{ backgroundColor: "blue" }}>
                                    <Container className="p-0">
                                        <Row>
                                            <Col className="p-0 inline-flex">
                                                <img className="w-10 pr-1" src={village == "home" ? Util.getBuilderHallImage(builderHallLevel) : Util.getTownHallImage(townHallLevel, townHallWeaponLevel)}/>
                                                <p className="p-0 sm:text-xs">Switch to {village == "home" ? "Builder Base" : "Home Village"}</p>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Button>
                            </Link>
                        </Center>
                    </Col> : undefined}
                </Row>
                <Row>
                    <Col className="border border-solid border-[#281303] rounded-md bg-[linear-gradient(#C5792B,_#FAC40D)]">
                        <Center>
                            <img src="/Images/Clash of Clans/Season Boost Builder.png"/>
                        </Center>
                        <h5 align="center"> Builder Boost </h5>
                        <h1 align="center" className="coc-description"> {builderBoost}% </h1>
                    </Col>
                    <Col className="border border-solid border-[#281303] rounded-md bg-[linear-gradient(#C5792B,_#FAC40D)]">
                        <Center>
                            <img src="/Images/Clash of Clans/Season Boost Research.png"/>
                        </Center>
                        <h5 align="center"> Research Boost </h5>
                        <h1 align="center" className="coc-description"> {researchBoost}% </h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="p-0">
                    {townHallLevel >= 7 ? (
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
                            <div className="grid grid-cols-2">
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
                    ) : undefined}
                    </Col>
                </Row>
            </Container>
            <Tabs tabs={tabs}></Tabs>
        </Layout>
    );
};
CocUpgradeTrackerPlayerVillagePage.disableLayout = true;
CocUpgradeTrackerPlayerVillagePage.authenticationRequired = true;
CocUpgradeTrackerPlayerVillagePage.queryRequired = true;
CocUpgradeTrackerPlayerVillagePage.afterAuthentication = function (session, router) {
    const playerTag = router.query.playerTag as string;
    const village = router.query.village as string;
    //Ensures the player tag parameter was given
    if (!playerTag) {
        router.push("/upgrade-tracker/clashofclans");
        return false;
    };
    const resolvedTag = Util.validateTag(playerTag);
    //Ensures the village parameter was given and is valid
    if (!village) {
        router.push(`/upgrade-tracker/${resolvedTag.replace(/#/g, "")}`);
        return false;
    };
    if (!["home", "builder"].includes(village)) {
        router.push(`/upgrade-tracker/${resolvedTag.replace(/#/g, "")}`);
        return false;
    };
};
CocUpgradeTrackerPlayerVillagePage.fetchData = {
    url: "/api/upgrade-tracker/clashofclans/village",
    data: (data) => {
        return {
            playerTag: data.resolvedTag,
            village: data.village,
            user: data.user
        };
    },
    parseData: (router, user) => {
        return {
            resolvedTag: Util.validateTag(router.query.playerTag as string),
            village: router.query.village,
            user: user
        };
    },
    method: "post"
};
export default CocUpgradeTrackerPlayerVillagePage;