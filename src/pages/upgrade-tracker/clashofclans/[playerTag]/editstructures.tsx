import type { NextPageWithConfiguration } from "@util/types";
import Util from "@util/index";
import Layout from "@components/Layout/index";
import type { ClashOfClansVillage } from "@database/Models/clashofclans";
import { ChangeEvent, useLayoutEffect, useRef, useState } from "react";
import type { FC } from "react";
import Tabs from "@components/Tabs";
import Grid from "@components/Utilities/Grid";
import Center from "@components/Utilities/Center";
import Input from "@components/Elements/Input";
import { CheckIcon } from "@heroicons/react/outline";
import Button from "@components/Elements/Button";
import Slider from "@components/Slider";
import { townHall } from "@database/Clash of Clans/Home/townHall";
import { builderHall } from "@database/Clash of Clans/Builder/builderHall";

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
    const villageTabs: {
        [key: string]: JSX.Element;
    } = {
        "Home Village": <EditStructuresTab village="home" playerSchema={playerSchema}/>
    };
    if (player.builderHallLevel) villageTabs["Builder Base"] = <EditStructuresTab village="builder" playerSchema={playerSchema}/>;
    return (
        <Layout title={title} header={header} description={tag}>
            <Tabs initialTabIndex={villages.indexOf(initialVillage)} onTabChange={changeTab()} tabs={villageTabs}/>
        </Layout>
    );
};

const EditStructuresTab: FC<{ 
    village: "home" | "builder",
    playerSchema: ClashOfClansVillage
}> = ({ village, playerSchema }) => {
    const { player } = playerSchema;
    const { homeDefensesArray, builderDefensesArray } = Util.Constants.CoC;
    const [universalSelector, setUniversalSelector] = useState(0);
    function saveUniversalSelector() {
        return (ev: ChangeEvent<HTMLInputElement>) => {
            if (!ev.target.value) return;
            setUniversalSelector(parseInt(ev.target.value));
        };
    };
    //Set's all buildings maxed for the TH level: `universal selector` value
    function validateUniversalSelector() {
        return () => {
            //If the Town Hall level is higher than the player's town hall level
            if (universalSelector > (village == "home" ? player.townHallLevel : player.builderHallLevel || 1)) {
                return Util.toast.error(`Do not exceed the maximum ${village == "home" ? "Town Hall" : "Builder Hall"} level!`);
            //If the Town Hall level is less than 1
            } else if (universalSelector < 1) {
                return Util.toast.error(`${village == "home" ? "Town Hall" : "Builder Hall"} level must be atleast 1!`);
            };
            Util.Emitter.emit("MAXED_FOR_VILLAGE", universalSelector);
            Util.toast.success(`Set everything maxed for ${village == "home" ? "Town Hall" : "Builder Hall"} ${universalSelector}!`);
        };
    };
    //Set's all buildings to Lv. 0
    function resetUniversalSelector() {
        return () => {
            //Event Emitter
            Util.Emitter.emit("RESET");
        };
    };
    return (
        <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
                <Center>
                    <div>
                        <Center><p className="text-xl mb-2">Options</p></Center>
                        <Grid className="grid-cols-1 sm:grid-cols-2 items-center">
                            <Center className="justify-self-center sm:justify-self-end">
                                <p className="text-center">Set everything for {village == "home" ? "Town Hall" : "Builder Hall"}</p>
                            </Center>
                            <Center className="justify-self-center sm:justify-self-start">
                                <Input defaultValue={universalSelector} className="sm:ml-2 w-16" onChange={saveUniversalSelector()} type="number" maxLength={2} min={1} max={village == "home" ? player.townHallLevel : player.builderHallLevel || 1}/>
                                <Button onClick={validateUniversalSelector()} className="bg-green-500 p-2 w-13 h-13">
                                    <CheckIcon className="w-5"/>
                                </Button>
                                <Button onClick={resetUniversalSelector()} className="bg-red-600">Reset</Button>
                            </Center>
                        </Grid>
                    </div>
                </Center>
                {village == "home" ? 
                <Center className="mt-2">
                    <p className="text-xl mb-2">Builder&apos;s Hut </p>
                </Center> : undefined}
            </div>
            <Center className="sm:col-span-2 md:col-span-3 lg:col-span-4">
                <p className="text-xl mb-2">Defenses</p>
            </Center>
            {(village == "home" ? homeDefensesArray.filter((defense) => !defense.toLowerCase().includes("giga") && !defense.toLowerCase().includes("builder")) : builderDefensesArray).map((defense) => {
                //@ts-ignore
                const hallItem = Util.getHallItem(defense, village == "home" ? player.townHallLevel : player.builderHallLevel, village);
                //@ts-ignore
                const amount: number = hallItem.amount ? hallItem.amount : hallItem;
                const defenses: Array<JSX.Element> = [];
                for (let i = 1; i <= amount; i++) {
                    defenses.push(
                        <SliderGroup buildingName={defense} buildingID={i} path={`Defenses/${defense}`} playerSchema={playerSchema} village={village}/>
                    );
                };
                return (
                    <>
                    {defenses.map((jsxElement) => <>{jsxElement}</>)}
                    </>
                );
            })}
        </Grid>
    );
};

const SliderGroup: FC<{
    buildingName: string,
    buildingID: number,
    path: string,
    buildingMinLevel?: number,
    village: "home" | "builder",
    playerSchema: ClashOfClansVillage,
    staticImagePath?: string
}> = ({ buildingName, buildingID, buildingMinLevel, village, playerSchema, path, staticImagePath }) => {
    if (!buildingMinLevel) buildingMinLevel = 0;
    const { player } = playerSchema;
    const databaseBuilding = playerSchema[village == "home" ? "homeVillage" : "builderBase"][Util.toCamelCase(buildingName)];
    const databaseItem = databaseBuilding ? databaseBuilding[buildingID] : 0;
    const [formName, setFormName] = useState(`${buildingName} - ${buildingID} - ${databaseItem}`);
    //@ts-ignore
    const buildingMaxLevel: number = (village == "home" ? townHall : builderHall)[(village == "home" ? player.townHallLevel : player.builderHallLevel) - 1][Util.toCamelCase(buildingName)].maxLevel || player.builderHallLevel; 
    const imageRef = useRef<HTMLImageElement>(null);
    const inputNumberRef = useRef<HTMLInputElement>(null);
    const inputSliderRef = useRef<HTMLInputElement>(null);
    //After the DOM is rendered
    useLayoutEffect(() => {
        if (imageRef.current) {
            //Event Listener to set the building maxed for TH: `universal selector` value
            Util.Emitter.on("MAXED_FOR_VILLAGE", (maxedFor) => {
                //@ts-ignore The Hall item
                const hallItem = Util.getHallItem(buildingName, maxedFor, village);
                //@ts-ignore The amount of buildings (at lower levels you don't have every building, which means, they are undefined or Level `0`)
                const amount: number = hallItem?.amount ? hallItem?.amount : hallItem || 0;
                //@ts-ignore Makes the check of the above mentioned issue
                if (buildingID <= amount) setLevel(village == "home" ? hallItem?.maxLevel || 0 : hallItem?.maxLevel || (hallItem ? maxedFor : 0));
                //Issue: set Level `0` instead
                else setLevel(0);
            });
            Util.Emitter.on("RESET", () => setLevel(0));
        };
    }, []);
    function slider() {
        return (ev: ChangeEvent<HTMLInputElement>) => {
            if (!ev.target.value) return;
            const level = parseInt(ev.target.value);
            if (level > buildingMaxLevel) return Util.toast.error(`${buildingName}'s maximum level for your ${village == "home" ? "Town Hall" : "Builder Hall"} level: ${buildingMaxLevel}`);
            setLevel(level);
        };
    };
    function setLevel(level: number) {
        if (imageRef.current) imageRef.current.src = staticImagePath ? staticImagePath : `/Images/Clash of Clans/${Util.toCapitalize(village)}/${path}/${level}.png`;
        if (inputNumberRef.current) inputNumberRef.current.value = level.toString();
        if (inputSliderRef.current) inputSliderRef.current.value = level.toString();
        setFormName(`${buildingName} - ${buildingID} - ${level}`);
    };
    return (
        <Grid className="grid-cols-3 items-center">
            <Input className="col-span-3" name={`${buildingName}${buildingID}`} type="hidden" value={formName} />
            <img universal-selector="true" ref={imageRef} src={staticImagePath ? staticImagePath : `/Images/Clash of Clans/${Util.toCapitalize(village)}/${path}/${databaseItem}.png`} className="max-h-full w-auto h-14"/>
            <Slider ref={inputSliderRef} defaultValue={databaseItem} maxLength={2} min={buildingMinLevel} max={buildingMaxLevel} onChange={slider()}/>
            <Input className="w-20" ref={inputNumberRef} defaultValue={databaseItem} maxLength={2} type="number" min={buildingMinLevel} max={buildingMaxLevel} onChange={slider()}/>
        </Grid> 
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
    data: (router, user) => {
        return {
            playerTag: Util.validateTag(router.query.playerTag as string),
            user: user
        };
    },
    method: "post"
};

export default ClashOfClansEditStructuresPage;