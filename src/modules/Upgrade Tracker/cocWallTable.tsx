import { FC } from "react";
import Table from "@components/Table";
import { ClashOfClansVillage } from "@database/Models/clashofclans";
import Util from "@util/index";
import { townHall } from "@database/Clash of Clans/Home/townHall";
import { builderHall } from "@database/Clash of Clans/Builder/builderHall";
import { home } from "@database/Clash of Clans/home";
import { builder } from "@database/Clash of Clans/builder";
import Center from "@components/Center";
import Grid from "@components/Grid";
import Input from "@components/Input";
import Button from "@components/Button";

const ClashOfClansWallTable: FC<{
    playerSchema: ClashOfClansVillage,
    village: "home" | "builder"
}> = ({ playerSchema, village }) => {
    const { townHallLevel, builderHallLevel} = playerSchema.player;
    const lowestWall = Util.min(Object.keys(playerSchema[village == "home" ? "homeVillage" : "builderBase"].Walls).map(wallLevel => parseInt(wallLevel)));
    const levels = [];
    //@ts-ignore
    const hallItem = village == "home" ? townHall[townHallLevel - 1].wall : builderHall[builderHallLevel - 1].wall;
    //@ts-ignore
    const hallItemMaxLevel = hallItem.maxLevel ? hallItem.maxLevel : builderHallLevel;
    for (let i = lowestWall; i <= (village == "home" ? hallItemMaxLevel : builderHallLevel); i++) levels.push(i);
    const rows: Array<Array<JSX.IntrinsicElements["td"]>> = [];
    for (const item of levels) {
        const wallItem = (village == "home" ? home : builder).find(element => element.name == "Wall");
        const dataBaseItem = playerSchema[village == "home" ? "homeVillage" : "builderBase"].Walls as { [key: string]: string };
        rows.push([
            <td className="align-middle">
                <Center>
                    <img className="h-16 w-auto max-h-full" src={`/Images/Clash of Clans/${Util.toCapitalize(village)}/Defenses/Wall/${item}.png`}/>
                </Center>
                <p className="coc-description text-green-500 text-xl" align="center">Level {item}</p>
            </td>,
            <td className="align-middle">
                <h1 className="coc-description text-5xl" align="center">{dataBaseItem[item.toString()] || 0}</h1>
            </td>,
            <td className="align-middle">
                <Grid>
                    <Row>
                        {item != hallItemMaxLevel ? 
                        <>
                            <Column>
                                <div>Lv. {item + 1}</div>
                            </Column>
                            <Column>
                                <div className="inline-flex">
                                    <div align="right">{Util.convertNumber(wallItem?.levels[item].calculateSeasonBoostCosts(playerSchema.builderSeasonBoost))}</div>
                                    <img className="w-6" src={`/Images/Clash of Clans/${(wallItem?.levels[item].costType == "gold" ? "Home/Gold" : (wallItem?.levels[item].costType == "builderGold") ? "Builder/Builder Gold" : "Home/Gold and Elixir")}.png`}/>
                                </div>
                            </Column>
                            <Column>
                                <div className="inline-flex">
                                    <div align="right">{Util.convertNumber((parseInt(dataBaseItem[item.toString()]) || 0) * wallItem?.levels[parseInt(item)].calculateSeasonBoostCosts(playerSchema.builderSeasonBoost))}</div>
                                    <img className="w-6" src={`/Images/Clash of Clans/${(wallItem?.levels[item].costType == "gold" ? "Home/Gold" : (wallItem?.levels[item].costType == "builderGold") ? "Builder/Builder Gold" : "Home/Gold and Elixir")}.png`}/>
                                </div>
                            </Column>
                            <Column>
                                {(parseInt(dataBaseItem[item.toString()]) || 0) != 0 ? 
                                <div className="flex" align="right">
                                    <Input type="number" min="1" max={dataBaseItem[item.toString()]} defaultValue="1"/>
                                    <Button className="builder-button"/>
                                </div> : undefined}
                            </Column>
                        </> : undefined}
                    </Row>
                </Grid>
            </td>
        ]);
    };
    return (
        <Table headings={["Wall", "Quantity", "Upgrade Info"]} rows={rows}></Table>
    );
};
export default ClashOfClansWallTable;