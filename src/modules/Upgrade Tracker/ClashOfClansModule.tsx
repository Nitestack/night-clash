import type { FC } from "react";
import type { ClashOfClansVillage } from "@models/clashofclans";
import Util from "@util/index";
import Grid from "@components/Utilities/Grid";
import { home } from "@database/Clash of Clans/home";
import { builder } from "@database/Clash of Clans/builder";
import { townHall } from "@database/Clash of Clans/Home/townHall";
import { builderHall } from "@database/Clash of Clans/Builder/builderHall";
import Center from "@components/Utilities/Center";
import type Base from "@database/Clash of Clans/Base";
import Button from "@components/Elements/Button";
import { LockClosedIcon, CheckIcon } from "@heroicons/react/outline";
import styles from "@modules/Upgrade Tracker/ClashOfClansModule.module.scss";

const ClashOfClansModule: FC<{
    type: "Defense" | "Trap" | "Resource" | "Army" | "Hero" | "Troop",
    village: "home" | "builder",
    playerSchema: ClashOfClansVillage
} | {
    village: "home",
    type: "Pet" | "Siege Machine" | "Spell" | "Dark Troop",
    playerSchema: ClashOfClansVillage
}> = ({ type, village, playerSchema }) => {
    let iterationArray: Array<string>;
    const { player, homeVillage, builderBase } = playerSchema;
    const { townHallLevel, builderHallLevel } = player;
    const database = (village == "home" ? homeVillage : builderBase) as { [key: string]: string };
    const { homeDefensesArray, builderDefensesArray, homeTrapsArray, builderTrapsArray, homeResourcesArray, builderResourcesArray, homeArmyArray, builderArmyArray, homeHeroesArray, homePetsArray, homeSpellsArray, homeSiegeMachinesArray, homeTroopsArray, builderTroopsArray, homeDarkTroopsArray, laboratoryArray } = Util.Constants.CoC;
    switch (type) {
        case "Defense":
            iterationArray = village == "home" ? homeDefensesArray : builderDefensesArray;
            break;
        case "Trap": 
            iterationArray = village == "home" ? homeTrapsArray : builderTrapsArray;
            break;
        case "Resource":
            iterationArray = village == "home" ? homeResourcesArray : builderResourcesArray;
            break;
        case "Army":
            iterationArray = village == "home" ? homeArmyArray : builderArmyArray; 
            break;
        case "Hero":
            iterationArray = village == "home" ? homeHeroesArray : ["Battle Machine"];
            break;
        case "Pet":
            iterationArray = homePetsArray;
            break;
        case "Spell":
            iterationArray = homeSpellsArray;
            break;
        case "Siege Machine": 
            iterationArray = homeSiegeMachinesArray;
            break;
        case "Troop": 
            iterationArray = village == "home" ? homeTroopsArray : builderTroopsArray;
            break;
        case "Dark Troop":
            iterationArray = homeDarkTroopsArray;
            break;
        default:
            iterationArray = [];
            break;
    };

    function getPrices(item: string, maxedAmount: number, maxedLevel: number, lowestLevel: number, itemCosts: Base) {
        const prices: Array<JSX.Element> = [];
        for (let i = 0; i < (village == "builder" && item == "Army Camp" ? maxedAmount :  maxedLevel) - lowestLevel; i++) {
            const elementLevel = itemCosts.levels[lowestLevel + i];
            //@ts-ignore
            if (elementLevel.text) {
                prices.push(
                    <div className="col-span-2 md:col-span-3 text-red-600 text-center">{elementLevel.text}</div>
                );
            } else {
                //@ts-ignore
                //If the Laboratory/Star Laboratory is too low for the troop upgrade
                if (laboratoryArray.includes(item) && elementLevel.requiredLabLevel > (parseInt(database[village == "home" ? "Laboratory1" : "StarLaboratory1"]) || 0)) {
                    prices.push(
                        <Center className="col-span-2 md:col-span-3">
                            <div>{village == "builder" && item == "Army Camp" ? "" : "Lv."} {lowestLevel + i + 1}{village == "builder" && item == "Army Camp" ? "." : ""}</div>
                            <div className="text-red-600 text-center">{village == "home" ? "" : "Star"} Level {elementLevel.requiredLabLevel} {village == "home" ? "" : "Star"} Laboratory Required!</div>
                        </Center>
                    );
                } else {
                    prices.push(
                        <>
                            <Center className="whitespace-nowrap justify-self-center col-span-2 md:col-span-1 md:justify-self-start text-xs sm:text-sm md:text-base">{village == "builder" && item == "Army Camp" ? "" : "Lv."} {lowestLevel + i + 1}{village == "builder" && item == "Army Camp" ? "." : ""}</Center>
                            <Center className="justify-self-center">
                                <div className="text-right text-xs sm:text-sm md:text-base">{item == "Builder's Hut" && lowestLevel + i + 1 == 1 ? (parseInt(database.Builder) == 4 ? "2k" : (parseInt(database.Builder) == 3 ? "1k & 2k" : "500 & 1k & 2k")) : Util.convertNumber(elementLevel.calculateSeasonBoostCosts(playerSchema[laboratoryArray.includes(item) || homePetsArray.includes(item) ? "researchSeasonBoost" : "builderSeasonBoost"]))}</div>
                                {elementLevel.costType == "builderGoldAndElixir" || elementLevel?.costType == "goldAndElixir" ? 
                                <img className="w-6" src="/Images/Clash of Clans/Home/Gold and Elixir.png"/> : 
                                <img className="w-6" src={`/Images/Clash of Clans/${Util.toCapitalize(village)}/${Util.toCapitalize(elementLevel?.costType.replace(/([A-Z]+)/g, ' $1').trim())}.png`}/>}
                            </Center>
                            <Center className="md:justify-self-end text-xs sm:text-sm md:text-base whitespace-nowrap">{Util.convertMilliseconds(elementLevel.calculateSeasonBoostTimeInSeconds(laboratoryArray.includes(item) || homePetsArray.includes(item) ? playerSchema.researchSeasonBoost : playerSchema.builderSeasonBoost) * 1000, true)}</Center>
                        </>
                    );
                };
            };
        };
        return (
            <>
                {prices.map(level => 
                    <>{level}</>
                )}
            </>
        );
    };

    function getLevels(item: string, levels: Array<number>, itemCosts: Base, maxedLevel: number) {
        const levelElements: Array<JSX.Element> = [];
        let index = 1;
        for (const level of levels) {
            const building = (village == "home" ? playerSchema.homeVillageBuilder : playerSchema.builderBaseBuilder).find(building => building.name.toLowerCase() == item.toLowerCase() && building.id == index + 1);
            const lab = (village == "home" ? playerSchema.homeLab : playerSchema.builderLab).find(unit => unit.name.toLowerCase() == item.toLowerCase());
            const otto = playerSchema.otto.builder.find(building => building.name.toLowerCase() == item.toLowerCase() && building.id == index + 1);
            const builder = building || lab || otto ? building || lab || otto : false;
            levelElements.push(
                <>
                    <Center className="justify-self-center">
                        <img className="h-8 sm:h-11 md:h-14 max-h-full w-auto" src={level == 0 ? itemCosts.levelNullImagePath : itemCosts.levels[level - 1].imageUrl}/>
                    </Center>
                    {builder ? 
                        <></> : 
                        <>
                            {!(village == "builder" && item == "Army Camp") ? 
                            <Center className="justify-self-center">
                                <div className="whitespace-nowrap text-xs sm:text-sm md:text-base">Lv. {level}</div>
                            </Center> : undefined}
                            <Center className="col-span-2 md:col-span-1 justify-self-center">
                                {maxedLevel == level ? 
                                <Button disabled className="p-1 bg-green-500 h-10 w-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
                                    <Center>
                                        <CheckIcon className="w-6 md:w-10"/>
                                    </Center>
                                </Button> : (laboratoryArray.includes(item) ? (level == 0 || itemCosts.levels[level - 1].requiredLabLevel || 1 > (parseInt(database[village == "home" ? "Laboratory1" : "StarLaboratory1"]) || 0) ? 
                                <Button disabled className="p-1 bg-red-600 h-10 w-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
                                    <Center>
                                        <LockClosedIcon className="w-6 md:w-10"/>
                                    </Center>
                                </Button> : 
                                <Button className={Util.classNames(styles["lab-button"], "h-10 w-10 sm:w-12 sm:h-12 md:w-16 md:h-16")}/>) : 
                                <Button className={Util.classNames(styles["builder-button"], "h-10 w-10 sm:w-12 sm:h-12 md:w-16 md:h-16")}/>)}
                            </Center>
                        </>
                    }
                </>
            );
            index++;
        };
        return (
            <>
                {levelElements.map(level => 
                    <>{level}</>
                )}
            </>
        );
    };

    function createRows() {
        const rows: Array<JSX.Element> = [];
        for (const item of iterationArray) {
            //Town Halls
            const playerTownHall = townHall[townHallLevel - 1];
            const maxedTownHall = townHall[townHall.length - 1];
            //Builder Halls
            const playerBuilderHall = builderHall[(builderHallLevel || 1) - 1];
            const maxedBuilderHall = builderHall[builderHall.length - 1];
            //Check if the player has access to the item
            if (Util.CocUpgradeTracker.isInHall(item, village == "home" ? playerTownHall : playerBuilderHall)) {
                //Item Information
                const hallItem = (village == "home" ? playerTownHall : playerBuilderHall)[Util.toCamelCase(item)];
                const maxedHallItem = item.toLowerCase().includes("giga") ? hallItem : (village == "home" ? maxedTownHall : maxedBuilderHall)[Util.toCamelCase(item)];
                //@ts-ignore
                const itemCosts: Base = (village == "home" ? home : builder).find(unit => unit.name == item);
                //@ts-ignore
                const maxedAmount: number = hallItem.amount || hallItem;
                //@ts-ignore
                const maxedLevel: number = village == "builder" && item == "Army Camp" ? 1 : hallItem.maxLevel || player.builderHallLevel;
                //@ts-ignore
                const ultimateMaxedLevel: number = maxedHallItem.maxedLevel || builderHall.length;
                //Levels of the item (multiple building levels or single troop level)
                let levels: Array<number> = [];
                if (["Troop", "Dark Troop", "Spell", "Siege Machine", "Hero", "Pet"].includes(type)) {
                    const unit = player[["Troop", "Dark Troop", "Siege Machine"].includes(type) ? "troops" : (["Hero", "Pet"].includes(type) ? "heroes" : "spells")].find(element => element.name.toLowerCase() == item.toLowerCase() && element.village.toLowerCase().includes(village));
                    if (unit) levels.push(unit.level);
                    else levels.push(0);
                } else {
                    levels = Util.CocUpgradeTracker.getLevelArray(item, database as { [key: string]: string }, player);
                    if (levels.length < maxedAmount) for (let i = levels.length; i < maxedAmount; i++) levels.push(0);
                };
                const lowestLevel = Util.min(levels);
                rows.push(
                    <>
                        <Center className="flex-col">   
                            <p className="text-center text-xs sm:text-lg md:text-xl">{item.includes("Giga") && item.includes("Giga Inferno") ? item.replace(/1/g, "").replace(/2/g, "") : item}</p>
                            <Center>
                                {!(item == "Army Camp" && village == "builder") ? 
                                <p className="font-coc-description text-green-500 text-xl whitespace-nowrap text-center">Level {maxedLevel}</p> : undefined}
                            </Center>
                            <Center>
                                <img className="w-auto max-h-full h-12 sm:h-16 md:h-20 lg:h-24" src={itemCosts.levels[maxedLevel - 1].imageUrl}/>
                            </Center>
                        </Center>
                        <Grid className={Util.classNames("md:col-span-2 grid-cols-2 md:grid-cols-3 w-full gap-1 border-solid border-lightmodetext dark:border-darkmodetext border-l border-r border-b", iterationArray.indexOf(item) == 0 ? "border-t" : "")}>
                            {getLevels(item, levels, itemCosts, maxedLevel)}
                        </Grid>
                        <Grid className={Util.classNames("md:col-span-2 md:grid-cols-3 w-full gap-1 border-solid border-lightmodetext dark:border-darkmodetext border-r border-b", iterationArray.indexOf(item) == 0 ? "border-t" : "")}>
                            {lowestLevel == maxedLevel ? 
                            <>
                                {village == "builder" && item == "Army Camp" ? 
                                    <p className="md:col-span-3 text-center text-green-500 font-xl font-coc-description">{builderHallLevel || 1 >= 8 ? "Maximum amount of buildings reached" : "Maximum amount of buildings reached for your BH level"}</p>
                                : ((lowestLevel == maxedLevel && item.includes("Giga")) || lowestLevel == ultimateMaxedLevel ? 
                                    <p className="md:col-span-3 text-center text-green-500 font-xl font-coc-description">
                                        Maximum level reached
                                    </p> : 
                                    <p className="md:col-span-3 text-center text-green-500 font-xl font-coc-description">
                                        Maximum level reached for your {village == "home" ? "T" : "B"}H level!
                                    </p>)
                                }
                            </> : 
                            <>{getPrices(item, maxedAmount, maxedLevel, lowestLevel, itemCosts)}</>}
                        </Grid>
                    </>
                );
            };
        };
        return (
            <>
                {rows.map(row => 
                    <>{row}</>
                )}
            </>
        );
    };

    return (
        <Grid className="grid-cols-3 md:grid-cols-5 gap-1 justify-items-center">
            {createRows()}
        </Grid>
    );
};
export default ClashOfClansModule;