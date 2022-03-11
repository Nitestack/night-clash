import { townHall } from "@database/Clash of Clans/Home/townHall";
import { builderHall } from "@database/Clash of Clans/Builder/builderHall";
import { CSSProperties, FC } from "react";
import { APIPlayer } from "clashofclans.js";
import Util from "@util/index";
import styles from "@modules/ClashOfClansUnitIcon.module.scss";

const ClashOfClansUnitIcon: FC<{
    name: string,
    village?: "home" | "builder",
    player: APIPlayer,
    path: string,
    type: "troop" | "pet" | "siegeMachine" | "hero" | "spell"
}> = ({ village: initialVillage, name, path, type, player }) => {
    let village = initialVillage || "home";
    const hallLevel = village == "home" ? player.townHallLevel : (player.builderHallLevel || 1);
    const hall = village == "home" ? townHall[hallLevel - 1] : builderHall[hallLevel - 1];
    const unitElement = player[(type == "troop" || type == "pet" || type == "siegeMachine" ? "troops" : (type == "hero" ? "heroes" : "spells"))].find(element => element.name.toLowerCase() == name.toLowerCase() && element.village.toLowerCase().includes(village.toLowerCase()));
    //@ts-ignore
    const maxedLevel: number = hall[Util.toCamelCase(name)]?.maxLevel || 0;
    let level = 0;
    let maxLevel = 0;
    if (unitElement) { 
        level = unitElement.level; 
        maxLevel = unitElement.maxLevel; 
    };
    const backgroundImage: CSSProperties = {
        backgroundImage: `url("/Images/Clash of Clans/${Util.toCapitalize(village)}/${path}/${name}${type == "pet" ? "_Icon" : ""}.png")`
    };
    if (level == 0) return (
        <div className={Util.classNames(styles["unit-icon"], styles["locked"])} style={backgroundImage} title={`${name} Level 0 (Max for TH: ${maxedLevel})`}></div>  
    );
    return (
        <div className={styles["unit-icon"]} style={backgroundImage} title={`${name} Level ${level} (Max for TH: ${maxedLevel})`}>
            {level == 1 && ![...Util.Constants.CoC.homeHeroesArray, "Battle Machine"].includes(name) ? undefined : 
            <div className={Util.classNames("[font-size:_17px;] [-webkit-text-stroke:_1px_black;]", styles["unit-icon-level"], level == maxLevel ? styles["max"] : (maxedLevel == level ? styles["maxTH"] : ""))}>{level}</div>}
        </div>
    );
};
export default ClashOfClansUnitIcon;