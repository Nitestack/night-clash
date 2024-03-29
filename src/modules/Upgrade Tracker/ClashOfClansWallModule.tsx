import type { FC } from "react";
import { ClashOfClansVillage } from "prisma/clashofclans";
import Grid from "@components/Utilities/Grid";
import Util from "@util/index";
import { townHall } from "@database/Clash of Clans/Home/townHall";
import { builderHall } from "@database/Clash of Clans/Builder/builderHall";
import Center from "@components/Utilities/Center";
import { home } from "@database/Clash of Clans/home";
import { builder } from "@database/Clash of Clans/builder";
import Input from "@components/Elements/Input";
import Button from "@components/Elements/Button";
import type Base from "@database/Clash of Clans/Base";
import styles from "@modules/Upgrade Tracker/ClashOfClansModule.module.scss";

const ClashOfClansWallModule: FC<{
    playerSchema: ClashOfClansVillage,
    village: "home" | "builder"
}> = ({ playerSchema, village }) => {
    const { townHallLevel, builderHallLevel} = playerSchema.player;
    const levels = Object.keys(Util.CocUpgradeTracker.getDatabaseItem("Walls", playerSchema, village)).map(level => parseInt(level));
    const hallItem = village == "home" ? townHall[townHallLevel - 1].wall : builderHall[(builderHallLevel || 1) - 1].wall;
    //@ts-ignore
    const maxedLevel = hallItem.maxLevel ? hallItem.maxLevel : builderHallLevel;
    const rows: Array<JSX.Element> = [];
    for (const item of levels) {
        //@ts-ignore
        const wallItem: Base = (village == "home" ? home : builder).find(element => element.name == "Wall");
        const dataBaseItem = Util.CocUpgradeTracker.getDatabaseItem("Walls", playerSchema, village);
        rows.push(
            <>
                <Center className="justify-self-center flex-col">
                    <img className="h-8 sm:h-12 md:h-16 max-h-full w-auto" src={`/Images/Clash of Clans/${Util.toCapitalize(village)}/Defenses/Wall/${item}.png`}/>
                    <Center>
                        <p className="font-coc-description text-green-500 sm:text-lg md:text-xl whitespace-nowrap text-center">Level {item}</p>
                    </Center>
                </Center>
                <Center className="justify-self-end sm:justify-self-center">
                    <h1 className="font-coc-description text-2xl sm:text-4xl md:text-5xl text-right sm:text-center">{dataBaseItem[item.toString()] || 0}</h1>
                </Center>
                <Grid className={Util.classNames("col-span-4", (dataBaseItem[item.toString()] || 0) != 0 ? "grid-cols-2 md:grid-cols-5" : "")} >
                    {item != maxedLevel ? 
                    <>
                        <Center className="col-span-2 md:col-span-1 justify-self-center md:justify-self-start">
                            <div className="whitespace-nowrap">Lv. {item + 1}</div>
                        </Center>
                        <Center className="justify-self-center">
                            <div className="text-right">{Util.convertNumber(wallItem?.levels[item].calculateSeasonBoostCosts(playerSchema.builderSeasonBoost))}</div>
                            <img className="w-6" src={`/Images/Clash of Clans/${(wallItem.levels[item].costType == "gold" ? "Home/Gold" : (wallItem?.levels[item].costType == "builderGold") ? "Builder/Builder Gold" : "Home/Gold and Elixir")}.png`}/>
                        </Center>
                        <Center className="justify-self-center">
                            <div className="text-right">{Util.convertNumber((dataBaseItem[item.toString()] || 0) * wallItem?.levels[item].calculateSeasonBoostCosts(playerSchema.builderSeasonBoost))}</div>
                            <img className="w-6" src={`/Images/Clash of Clans/${(wallItem.levels[item].costType == "gold" ? "Home/Gold" : (wallItem?.levels[item].costType == "builderGold") ? "Builder/Builder Gold" : "Home/Gold and Elixir")}.png`}/>
                        </Center>
                        {(dataBaseItem[item.toString()] || 0) != 0 ? 
                        <Center className="col-span-2">
                            <Input className="p-1 w-20" type="number" maxLength={dataBaseItem[item.toString()].toString().length} min="1" max={dataBaseItem[item.toString()]} defaultValue="1"/>
                            <Button className={Util.classNames(styles["builder-button"], "h-10 w-10 sm:w-12 sm:h-12 md:w-16 md:h-16")}/>
                        </Center> : undefined}
                    </> : undefined}
                </Grid>
            </>
        );
    };
    return (
        <Grid className="grid-cols-6">
            {rows.map(row => <>{row}</>)}
        </Grid>
    );
};
export default ClashOfClansWallModule;