import { townHall } from "@database/Clash of Clans/Home/townHall";
import { builderHall } from "@database/Clash of Clans/Builder/builderHall";
import { CSSProperties, FC } from "react";
import { APIPlayer } from "clashofclans.js";
import Util from "@util/index";

const ClashOfClansUnitIcon: FC<{
    name: string,
    village: "home" | "builder",
    player: APIPlayer,
    path: string,
    type: "troop" | "pet" | "siegeMachine" | "hero" | "spell"
}> = ({ village, name, path, type, player }) => {
    const hallLevel = village == "home" ? player.townHallLevel : (player.builderHallLevel || 1);
    const hall = village == "home" ? townHall[hallLevel - 1] : builderHall[hallLevel - 1];
    const unitElement = player[(type == "troop" || type == "pet" || type == "siegeMachine" ? "troops" : (type == "hero" ? "heroes" : "spells"))].find(element => element.name.toLowerCase() == name.toLowerCase() && element.village.toLowerCase().includes(village.toLowerCase()));
    let level = 0;
    let maxLevel = 0;
    if (unitElement) { 
        level = unitElement.level; maxLevel = unitElement.maxLevel; 
    };
    const backgroundImage: CSSProperties = {
        backgroundImage: `url("/Images/Clash of Clans/${Util.toCapitalize(village)}/${path}/${name}${type == "pet" ? "_Icon" : ""}.png")`
    };
    if (level == 0) return (
        <div className="unit-icon locked" style={backgroundImage} title={`${name} Level 0 (Max for TH: ${hall[Util.toCamelCase(name)] ? hall[Util.toCamelCase(name)].maxLevel : 0})`}></div>  
    );
    return (
        <div className="unit-icon" style={backgroundImage} title={`${name} Level ${level} (Max for TH: ${hall[Util.toCamelCase(name)].maxLevel})`}>
            {level == 1 && ![...Util.Constants.CoC.homeHeroesArray, "Battle Machine"].includes(name) ? undefined : 
            <div className={`[font-size:_17px;] unit-icon-level coc-description ${level == maxLevel ? "max" : (hall[Util.toCamelCase(name)].maxLevel == level) ? "maxTH" : ""}`}>{level}</div>}
        </div>
    );
};
export default ClashOfClansUnitIcon;