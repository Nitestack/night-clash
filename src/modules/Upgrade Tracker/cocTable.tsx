import { FC } from "react";
import Table from "@components/Table";
import Util from "@util/index";
import { ClashOfClansVillage } from "@database/Models/clashofclans";
import { home } from "@database/Clash of Clans/home";
import { builder } from "@database/Clash of Clans/builder";
import { townHall } from "@database/Clash of Clans/Home/townHall";
import { builderHall } from "@database/Clash of Clans/Builder/builderHall";
import Center from "@components/Center";
import Grid from "@components/Grid";
import Base from "@database/Clash of Clans/Base";
import Button from "@components/Button";
import { LockClosedIcon, CheckIcon } from "@heroicons/react/outline";

const ClashOfClansTable: FC<{
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
    function getImage(name: string, lvl: number, imagePath: string, small?: boolean) {
        let source = "";
        if (homeHeroesArray.includes(name)) {
            if (["Barbarian King", "Archer Queen"].includes(name)) {
                if (lvl >= 41) source = `${imagePath}/41.png`;
                else if (lvl >= 20) source = `${imagePath}/20.png`;
                else if (lvl >= 10) source = `${imagePath}/10.png`;
                else if (lvl >= 1) source = `${imagePath}/1.png`;
            } else if (name == "Battle Machine") {
                if (lvl >= 30) source = `${imagePath}/30.png`;
                else if (lvl >= 26) source = `${imagePath}/26.png`;
                else if (lvl >= 20) source = `${imagePath}/20.png`;
                else if (lvl >= 10) source = `${imagePath}/10.png`;
                else if (lvl >= 1) source = `${imagePath}/1.png`;
            } else source = `${imagePath}/1.png`;
        } else if (homePetsArray.includes(name) || homeSpellsArray.includes(name)) source = `${imagePath}.png`;
        else if (village == "builder" && name == "Army Camp") source = `${imagePath}/1.png`;
        else source = `${imagePath}/${lvl}.png`;
        return <img src={source} className={Util.classNames("w-auto max-h-full", small ? "h-5 sm:h-8" : "h-12 sm:h-16", homeSpellsArray.includes(name) ? "border border-solid border-[#3E4251] rounded-lg" : "")}/>
    };
    const rows: Array<Array<JSX.IntrinsicElements["td"]>> = [];
    function getPriceListItem(level: number, item: string, index: number, element?: Base) {
        const elementLevel = element?.levels[level + index];
        if (elementLevel?.text) return (
            <Column>
                <div className="text-red-600" align="center">{elementLevel?.text}</div>
            </Column>
        );
        else {
            if (laboratoryArray.includes(item) && elementLevel?.requiredLabLevel > (parseInt(database[village == "home" ? "Laboratory1" : "StarLaboratory1"]) || 0)) return (
                <>
                    <Column>
                        <div>{village == "builder" && item == "Army Camp" ? "" : "Lv."} {level + index + 1}{village == "builder" && item == "Army Camp" ? "." : ""}</div>
                    </Column>
                    <Column>
                        <div className="text-red-600" align="center">{village == "home" ? "" : "Star"} Level {elementLevel?.requiredLabLevel} {village == "home" ? "" : "Star"} Laboratory Required!</div>
                    </Column>
                </>
            );
            else return (
                <div className="inline-flex">
                    <div>{village == "builder" && item == "Army Camp" ? "" : "Lv."} {level + index + 1}{village == "builder" && item == "Army Camp" ? "." : ""}</div>
                    <div className="inline-flex">
                        <div align="right">{item == "Builder's Hut" && level + index + 1 == 1 ? (parseInt(database.Builder) == 4 ? "2k" : (parseInt(database.Builder) == 3 ? "1k & 2k" : "500 & 1k & 2k")) : Util.convertNumber(elementLevel?.calculateSeasonBoostCosts(playerSchema[laboratoryArray.includes(item) || homePetsArray.includes(item) ? "researchSeasonBoost" : "builderSeasonBoost"]))}</div>
                        {elementLevel?.costType == "builderGoldAndElixir" || elementLevel?.costType == "goldAndElixir" ? 
                        <img className="w-6" src="/Images/Clash of Clans/Home/Gold and Elixir.png"/> : 
                        <img className="w-6" src={`/Images/Clash of Clans/${Util.toCapitalize(village)}/${Util.toCapitalize(elementLevel?.costType.replace(/([A-Z]+)/g, ' $1').trim())}.png`}/>}
                    </div>
                    <div align="right">{Util.convertMilliseconds(elementLevel?.calculateSeasonBoostTimeInSeconds(laboratoryArray.includes(item) || homePetsArray.includes(item) ? playerSchema.researchSeasonBoost : playerSchema.builderSeasonBoost) * 1000, true)}</div>
                </div>
            );
        };
    };
    function getPriceList(item: string, hallItemAmount: number, hallItemMaxLevel: number, level: number, element: Base) {
        const priceListItems: Array<JSX.IntrinsicElements["div"]> = [];
        for (let i = 0; i < (village == "builder" && item == "Army Camp" ? hallItemAmount :  hallItemMaxLevel) - level; i++) {
            priceListItems.push(getPriceListItem(level, item, i, element));
        };
        return priceListItems.map((priceListItem) => <Row>{priceListItem}</Row>);
    };
    function displayLevel(item: string, lvl: number, index: number, hallItemMaxLevel: number, imagePath: string, element: Base) {
        const building = (village == "home" ? playerSchema.homeVillageBuilder : playerSchema.builderBaseBuilder).find(building => building.name.toLowerCase() == item.toLowerCase() && building.id == index + 1);
        const lab = (village == "home" ? playerSchema.homeLab : playerSchema.builderLab).find(unit => unit.name.toLowerCase() == item.toLowerCase());
        const otto = playerSchema.otto.builder.find(building => building.name.toLowerCase() == item.toLowerCase() && building.id == index + 1);
        const builder = building || lab || otto ? building || lab || otto : false;
        return (
            <td className={"align-middle"}>
                <Grid>
                    <Row>
                        <Column xs="2">
                            {getImage(item, lvl, imagePath, true)}
                        </Column>
                        {builder ? <>
                        </> : 
                        <>
                            {!(village == "builder" && item == "Army Camp") ? 
                            <Column className="text-center py-2">
                                <div>Lv. {lvl}</div>
                            </Column> : undefined}
                            <Column className="flex justify-end">
                                {hallItemMaxLevel == lvl ? 
                                <Button disabled className="bg-green-500"><CheckIcon className="w-6"/></Button> : (laboratoryArray.includes(item) ? (lvl == 0 || element.levels[lvl - 1].requiredLabLevel > (parseInt(database[village == "home" ? "Laboratory1" : "StarLaboratory1"]) || 0) ? 
                                <Button disabled className="bg-red-600"><LockClosedIcon className="w-6"/></Button> : 
                                <Button className="lab-button"/>) : 
                                <Button className="builder-button"/>)}
                            </Column>
                        </>}
                    </Row>
                </Grid>
            </td>
        );
    };
    for (const item of iterationArray) {
        const playerTownHall = townHall[townHallLevel - 1];
        //@ts-ignore
        const playerBuilderHall = builderHall[builderHallLevel - 1];
        const maxTownHall = townHall[townHall.length - 1];
        const maxBuilderHall = builderHall[builderHall.length - 1];
        if (Util.CocUpgradeTracker.isInHall(item, village == "home" ? playerTownHall : playerBuilderHall)) {
            const imagePath = `/Images/Clash of Clans/${village == "home" ? "Home" : "Builder"}/${item == "Battle Machine" ? "Army" : (type == "Dark Troop" ? "Troop" : type)}${type != "Army" ? (type == "Hero" ? "es" : "s") : ""}/${item}`;
            const hallItem = (village == "home" ? playerTownHall : playerBuilderHall)[Util.toCamelCase(item)];
            const maxedHallItem = item.toLowerCase().includes("giga") ? hallItem : (village == "home" ? maxTownHall : maxBuilderHall)[Util.toCamelCase(item)];
            const element = (village == "home" ? home : builder).find(unit => unit.name == item);
            //@ts-ignore
            const hallItemAmount: number = hallItem.amount || hallItem;
            //@ts-ignore
            const hallItemMaxLevel: number = village == "builder" && item == "Army Camp" ? 1 : hallItem.maxLevel || player.builderHallLevel;
            let levels: Array<number> = [];
            if (["Troop", "Dark Troop", "Spell", "Siege Machine", "Hero", "Pet"].includes(type)) {
                const unit = player[["Troop", "Dark Troop", "Siege Machine"].includes(type) ? "troops" : (["Hero", "Pet"].includes(type) ? "heroes" : "spells")].find(element => element.name.toLowerCase() == item.toLowerCase() && element.village.toLowerCase().includes(village));
                if (unit) levels.push(unit.level);
                else levels.push(0);
            } else {
                levels = Util.CocUpgradeTracker.getLevelArray(item, database as { [key: string]: string }, player);
                if (levels.length < hallItemAmount) for (let i = levels.length; i < hallItemAmount; i++) levels.push(0);
            };
            const level = Util.min(levels);
            rows.push([
                <td className="align-middle" rowSpan={hallItemAmount}>
                    <p className="m-[5px]" align="center" >{item.includes("Giga") && item.includes("Giga Inferno") ? item.replace(/1/g, "").replace(/2/g, "") : item}</p>
                    {!(item == "Army Camp" && village == "builder") ? 
                    <p className="coc-description text-green-500 text-xl" align="center">Level {hallItemMaxLevel}</p> : undefined}
                    <Center>
                        {getImage(item, hallItemMaxLevel, imagePath)}
                    </Center>
                </td>,
                <>{displayLevel(item, levels[0], 0, hallItemMaxLevel, imagePath, element)}</>,
                <td className="align-middle" rowSpan={hallItemAmount}>
                    <Grid>
                        {level == hallItemMaxLevel ? 
                        <>
                            {village == "builder" && item == "Army Camp" ? 
                                <p align="center" className="text-green-500 font-xl coc-description">{builderHallLevel >= 8 ? "Maximum amount of buildings reached" : "Maximum amount of buildings reached for your BH level"}</p>
                            : ((level == hallItemMaxLevel && item.includes("Giga")) || level == (maxedHallItem.maxLevel || builderHall.length) ? 
                                <p align="center" className="text-green-500 font-xl coc-description">
                                    Maximum level reached
                                </p> : 
                                <p align="center" className="text-green-500 font-xl coc-description">
                                    Maximum level reached for your {village == "home" ? "T" : "B"}H level!
                                </p>)}</> : 
                            <>{getPriceList(item, hallItemAmount, hallItemMaxLevel, level, element)}</>}
                    </Grid>
                </td>
            ]);
            let index = 1;
            for (const lvl of levels.slice(1)) {
                rows.push([
                    <>{displayLevel(item, lvl, index, hallItemMaxLevel, imagePath, element)}</>
                ]);
                index++;
            };
        };
    };
    return (
        <Table headings={[type, "Upgrade Info", "Level"]} rows={rows}/>
    );
};
export default ClashOfClansTable;