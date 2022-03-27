import type { NextPageWithConfiguration } from "@util/types";
import Util from "@util/index";
import Layout from "@components/Layout/index";
import type { ClashOfClansVillage } from "@database/Models/clashofclans";
import { useLayoutEffect, useState } from "react";
import type { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import Grid from "@components/Utilities/Grid";
import Center from "@components/Utilities/Center";
import Input from "@components/Elements/Input";
import { CheckIcon } from "@heroicons/react/outline";
import Button from "@components/Elements/Button";
import Slider from "@components/Slider";
import { townHall } from "@database/Clash of Clans/Home/townHall";
import { builderHall } from "@database/Clash of Clans/Builder/builderHall";
import { useInputState } from "@mantine/hooks";
import Link from "@components/Elements/Link";
const ClashOfClansEditStructuresPage: NextPageWithConfiguration<{}, {}, {
    playerSchema: ClashOfClansVillage,
    village: "home" | "builder"
}> = ({ data }) => {
    const { playerSchema, village } = data;
    const { player } = playerSchema;
    const { tag, name } = player;

    const { homeDefensesArray, builderDefensesArray, homeTrapsArray, builderTrapsArray, homeResourcesArray, builderResourcesArray, homeArmyArray, builderArmyArray } = Util.Constants.CoC;
    const [universalSelector, setUniversalSelector] = useState(1);
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
                return Util.toast.error(`Do not exceed the maximum ${village == "home" ? "Town Hall" : "Builder Hall"} level!`, {
                    toastId: "TownHallHigher"
                });
            //If the Town Hall level is less than 1
            } else if (universalSelector < 1) {
                return Util.toast.error(`${village == "home" ? "Town Hall" : "Builder Hall"} level must be atleast 1!`, {
                    toastId: "TownHallLower"
                });
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
    //@ts-ignore
    const maxedLevel: number = Util.getHallItem("Wall", village == "home" ? player.townHallLevel : player.builderHallLevel, village).maxLevel || player.builderHallLevel;
    const [totalAmount, setTotalAmount] = useState(Util.CocUpgradeTracker.getDatabaseItem("Walls", playerSchema, village) ? Object.values(Util.CocUpgradeTracker.getDatabaseItem("Walls", playerSchema, village) || {}).reduce((prevValue, currentValue) => prevValue + currentValue) : 0);
    function displayWallSlider() {
        return (
            <>
                <Center className="sm:col-span-2 md:col-span-3 lg:col-span-4">
                    <p className="text-xl mb-2"> Walls </p>
                </Center>
                <Center className="sm:col-span-2 md:col-span-3 lg:col-span-4">
                    <p> Amount: {totalAmount}</p>
                </Center>
                {[...Array(maxedLevel)].map((_, i) => (
                    <WallSlider 
                    key={i}
                    databaseItem={Util.CocUpgradeTracker.getDatabaseItem("Walls", playerSchema, village)}
                    index={i}
                    setTotalAmount={setTotalAmount}
                    totalAmount={totalAmount}
                    village={village}/>
                ))}
            </>
        );
    };
    return (
        <Layout 
        title={`${name} - Edit ${village == "home" ? "Home Village" : "Builder Base"} structures - Clash of Clans - Upgrade Tracker`} 
        header={`${name} - Edit ${village == "home" ? "Home Village" : "Builder Base"} structures`} description={tag}>
            <form method="POST" action="/api/upgrade-tracker/clashofclans/editstructures">
                <Input type="hidden" name="playerTag" value={player.tag}/>
                <Input type="hidden" name="village" value={village}/>
                <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full bg-lightmodeprimary dark:bg-darkmodeprimary rounded-lg p-1 sm:p-2 md:p-3">
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
                                        <Button type="button" onClick={validateUniversalSelector()} className="bg-green-500 p-2 w-13 h-13">
                                            <CheckIcon className="w-5"/>
                                        </Button>
                                        <Button type="button" onClick={resetUniversalSelector()} className="bg-red-600">Reset</Button>
                                    </Center>
                                </Grid>
                            </div>
                        </Center>
                        {village == "home" ? 
                        <Center className="mt-2">
                            <p className="text-xl mb-2">Builder&apos;s Hut </p>
                        </Center> : undefined}
                    </div>
                    <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 justify-self-center">
                        <Center>
                            <Link href={`/upgrade-tracker/clashofclans/${player.tag.replace(/#/g, "")}#${village}`}>
                                <Button className="bg-red-600" type="button"> Cancel </Button>
                            </Link>
                            <Button className="bg-green-500" type="submit"> Proceed </Button>
                        </Center>
                    </div>
                    {["defenses", "traps", "resources", "army"].map(category => {
                        let iterationArray: Array<string> = [];
                        switch (category.toLowerCase()) {
                            case "defenses":
                                iterationArray = village == "home" ? 
                                homeDefensesArray.filter(defense => !defense.toLowerCase().includes("giga") 
                                && !defense.toLowerCase().includes("builder")) : builderDefensesArray;
                                break;
                            case "traps": 
                                iterationArray = village == "home" ? homeTrapsArray : builderTrapsArray;
                                break;
                            case "resources": 
                                iterationArray = village == "home" ? homeResourcesArray : builderResourcesArray;
                                break;
                            case "army": 
                                iterationArray = village == "home" ? 
                                homeArmyArray.filter(army => !army.toLowerCase().includes("spell") 
                                && army.toLowerCase() != "workshop"
                                && army.toLowerCase() != "pet house") : 
                                builderArmyArray.filter(army => army.toLowerCase() != "builder barracks");
                                break;
                        };
                        iterationArray = iterationArray.filter(defense => Util.getHallItem(defense, village == "home" ? player.townHallLevel : player.builderHallLevel || 1, village));
                        return (
                            <>
                                <Center className="sm:col-span-2 md:col-span-3 lg:col-span-4">
                                    <p className="text-xl mb-2">{Util.toCapitalize(category)}</p>
                                </Center>
                                {iterationArray.map((item, index) => (
                                    <GlobalSlider key={index}
                                    item={item}
                                    category={category}
                                    playerSchema={playerSchema}
                                    village={village}/>
                                ))}
                            </>
                        );
                    })}
                    {displayWallSlider()}
                    <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 justify-self-center">
                        <Center>
                            <Link href={`/upgrade-tracker/clashofclans/${player.tag.replace(/#/g, "")}#${village}`}>
                                <Button className="bg-red-600" type="button"> Cancel </Button>
                            </Link>
                            <Button className="bg-green-500" type="submit"> Proceed </Button>
                        </Center>
                    </div>
                </Grid>
            </form>
        </Layout>
    );
};

const GlobalSlider: FC<{
    item: string,
    playerSchema: ClashOfClansVillage,
    village: "home" | "builder",
    category: string
}> = ({ item, playerSchema, village, category }) => {
    const { player } = playerSchema;
    //@ts-ignore
    const hallItem = Util.getHallItem(item, village == "home" ? player.townHallLevel : player.builderHallLevel, village);
    //@ts-ignore
    const amount: number = hallItem.amount ? hallItem.amount : hallItem;
    const defenses: Array<JSX.Element> = [];
    //@ts-ignore
    const buildingMaxLevel: number = village == "builder" && item.toLowerCase() == "army camp" ? 1 : (village == "home" ? townHall : builderHall)[(village == "home" ? player.townHallLevel : player.builderHallLevel) - 1][Util.toCamelCase(item)].maxLevel || player.builderHallLevel;
    for (let i = 1; i <= amount; i++) {
        defenses.push(
            <SliderGroup buildingName={item} buildingID={i} path={`${Util.toCapitalize(category)}/${item}`} playerSchema={playerSchema} village={village}/>
        );
    };
    const [level, setLevel] = useInputState(Math.min(...(Util.CocUpgradeTracker.getLevels(item, playerSchema, village))));
    function onNumberInput() {
        return (ev: ChangeEvent<HTMLInputElement>) => {
            if (!ev.target.value) return setLevel(0);
            const newLevel = parseInt(ev.target.value);
            if (newLevel > buildingMaxLevel) {
                setLevel(buildingMaxLevel);
                return Util.toast.error(`${item}'s maximum level for your ${village == "home" ? "Town Hall" : "Builder Hall"} level: ${buildingMaxLevel}`, {
                    toastId: item
                }); 
            };
            ev.target.value = newLevel.toString();
            setLevel(newLevel);
            Util.Emitter.emit(item + village, newLevel);
        };
    };
    function onSlider() {
        return (ev: ChangeEvent<HTMLInputElement>) => {
            setLevel(parseInt(ev.target.value));
            Util.Emitter.emit(item + village, parseInt(ev.target.value));
        };
    };
    return (
        <div>
            <p className="text-center"> {item} </p>
            <p className="text-center font-coc-description"> Set all {item}&apos;s to Level </p>
            <Center>
                <Slider required className="col-span-2" value={level} maxLength={buildingMaxLevel.toString().length} min={0} max={buildingMaxLevel} onChange={onSlider()}/>
                <Input required className="w-20" value={level} maxLength={buildingMaxLevel.toString().length} type="number" min={0} max={buildingMaxLevel} onChange={onNumberInput()}/>
            </Center>
            {defenses.map((jsxElement, i) => <div key={i}>{jsxElement}</div>)}
        </div>
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
    const databaseBuilding = Util.CocUpgradeTracker.getDatabaseItem(buildingName, playerSchema, village);
    //@ts-ignore
    const buildingMaxLevel: number = village == "builder" && buildingName.toLowerCase() == "army camp" ? 1 : (village == "home" ? townHall : builderHall)[(village == "home" ? player.townHallLevel : player.builderHallLevel) - 1][Util.toCamelCase(buildingName)].maxLevel || player.builderHallLevel; 
    const [level, setLevel] = useInputState(databaseBuilding && databaseBuilding[buildingID] ? databaseBuilding[buildingID] : 0);
    //After the DOM is rendered
    useLayoutEffect(() => {
        //Event Listener to set the building maxed for TH: `universal selector` value
        Util.Emitter.on("MAXED_FOR_VILLAGE", (maxedFor) => {
            //@ts-ignore The Hall item
            const hallItem = Util.getHallItem(buildingName, maxedFor, village);
            //@ts-ignore The amount of buildings (at lower levels you don't have every building, which means, they are undefined or Level `0`)
            const amount: number = hallItem?.amount ? hallItem?.amount : hallItem || 0;
            //@ts-ignore Makes the check of the above mentioned issue
            if (buildingID <= amount) setLevel(village == "builder" && buildingName.toLowerCase() == "army camp" ? 1 : village == "home" ? hallItem?.maxLevel || 0 : hallItem?.maxLevel || (hallItem ? maxedFor : 0));
            //Issue: set Level `0` instead
            else setLevel(0);
        });
        //Event Listener to set all buildings of the same type at the same level
        Util.Emitter.on(buildingName + village, (level: number) => setLevel(level));
        //Event Listener to reset all building levels
        Util.Emitter.on("RESET", () => setLevel(0));
    }, []);
    function onNumberInput() {
        return (ev: ChangeEvent<HTMLInputElement>) => {
            if (!ev.target.value) return setLevel(0);
            const newLevel = parseInt(ev.target.value);
            if (newLevel > buildingMaxLevel) {
                setLevel(buildingMaxLevel);
                return Util.toast.error(`${buildingName}'s maximum level for your ${village == "home" ? "Town Hall" : "Builder Hall"} level: ${buildingMaxLevel}`, {
                    toastId: buildingName
                }); 
            };
            ev.target.value = newLevel.toString();
            setLevel(newLevel);
        };
    };
    return (
        <Grid className="grid-cols-4 items-center">
            <Input name={`${buildingName}_${buildingID}`} type="hidden" value={level}/>
            <img className="max-h-full w-auto h-14 justify-self-center" src={staticImagePath ? staticImagePath : `/Images/Clash of Clans/${Util.toCapitalize(village)}/${path}/${level}.png`}/>
            <Slider required className="col-span-2" value={level} maxLength={buildingMaxLevel.toString().length} min={buildingMinLevel} max={buildingMaxLevel} onChange={setLevel}/>
            <Input required className="w-20" value={level} maxLength={buildingMaxLevel.toString().length} type="number" min={buildingMinLevel} max={buildingMaxLevel} onChange={onNumberInput()}/>
        </Grid> 
    );
};

const WallSlider: FC<{
    totalAmount: number,
    setTotalAmount: Dispatch<SetStateAction<number>>,
    databaseItem: {
        [key: string]: number;
    },
    index: number,
    village: "home" | "builder"
}> = ({ totalAmount, setTotalAmount, databaseItem, index, village }) => {
    //@ts-ignore
    const wallMaxAmount: number = Util.getHallItem("Wall", village == "home" ? player.townHallLevel : player.builderHallLevel, village).amount || Util.getHallItem("Wall", village == "home" ? player.townHallLevel : player.builderHallLevel, village);
    const [amount, setAmount] = useInputState(databaseItem && databaseItem[index + 1] ? databaseItem[index + 1] : 0);
    //After the DOM is rendered
    useLayoutEffect(() => {
        //Event Listener to set the building maxed for TH: `universal selector` value
        Util.Emitter.on("MAXED_FOR_VILLAGE", (maxedFor) => {
            //@ts-ignore 
            const maxedAmount: number = Util.getHallItem("Wall", maxedFor, village).amount || Util.getHallItem("Wall", maxedFor, village);
            //@ts-ignore
            const maxedLevel: number = Util.getHallItem("Wall", maxedFor, village).maxLevel || maxedFor;
            if (maxedLevel == index + 1) {
                setTotalAmount(maxedAmount);
                setAmount(maxedAmount);
            //Issue: set Level `0` instead
            } else {
                setAmount(0);
            };
        });
        //Event Listener to reset all building levels
        Util.Emitter.on("RESET", () => {
            setTotalAmount(totalAmount - amount);
            setAmount(0);
        });
    }, []);
    return (
        <Grid className="grid-cols-4 items-center">
            <Input name={`Wall_${index + 1}`} type="hidden" value={amount}/>
            <img className="max-h-full w-auto h-14 justify-self-center" src={`/Images/Clash of Clans/${Util.toCapitalize(village)}/Defenses/Wall/${index + 1}.png`}/>
            <Slider required className="col-span-2" value={amount} maxLength={wallMaxAmount.toString().length} min={0} max={wallMaxAmount} onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                const newAmount = parseInt(ev.target.value);
                const newTotalAmount = (totalAmount - amount) + newAmount;
                if (newTotalAmount > wallMaxAmount) return Util.toast.error(`Total amount of Walls for your ${village == "home" ? "Town Hall" : "Builder Hall"} level: ${wallMaxAmount}`, {
                    toastId: "Wall"
                });
                ev.target.value = newAmount.toString();
                setTotalAmount(newTotalAmount);
                setAmount(newAmount);
            }}/>
            <Input required className="w-20" value={amount} maxLength={wallMaxAmount.toString().length} type="number" min={0} max={wallMaxAmount} onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                if (!ev.target.value) {
                    setTotalAmount(totalAmount - amount);
                    return setAmount(0);
                };
                const newAmount = parseInt(ev.target.value);
                const newTotalAmount = (totalAmount - amount) + newAmount;
                if (newTotalAmount > wallMaxAmount) return Util.toast.error(`Total amount of Walls for your ${village == "home" ? "Town Hall" : "Builder Hall"} level: ${wallMaxAmount}`, {
                    toastId: "Wall"
                });
                ev.target.value = newAmount.toString();
                setTotalAmount(newTotalAmount);
                setAmount(newAmount);
            }}/>
        </Grid> 
    );
};

ClashOfClansEditStructuresPage.disableLayout = true;
ClashOfClansEditStructuresPage.authenticationRequired = true;
ClashOfClansEditStructuresPage.queryRequired = true;
ClashOfClansEditStructuresPage.afterAuthentication = function (session, router) {
    const playerTag = router.query.playerTag as string;
    const village = router.query.village as string;
    //Ensures the player tag parameter was given
    if (!playerTag) {
        router.push("/upgrade-tracker/clashofclans");
        return false;
    };
    if (!village || !["home", "builder"].includes(village)) {
        router.push("/upgrade-tracker/clashofclans");
        return false;
    };
};
ClashOfClansEditStructuresPage.fetchData = {
    url: "/api/upgrade-tracker/clashofclans/village",
    data: (router, user) => {
        return {
            playerTag: Util.validateTag(router.query.playerTag as string),
            user: user,
            village: router.query.village
        };
    },
    method: "post"
};

export default ClashOfClansEditStructuresPage;