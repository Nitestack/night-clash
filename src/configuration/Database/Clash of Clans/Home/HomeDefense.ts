import Base from "@database/Clash of Clans/Base"; 
import type { ClashOfClansLevel } from "@database/Clash of Clans/Base";

export default class HomeDefense extends Base {
    constructor(infos: DefenseInfo) {
        const easyArray: Array<ClashOfClansLevel> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: infos.name.toLowerCase() == "wall" && i >= 8 ? "goldAndElixir" : (infos.name == "Builder's Hut" && i == 0 ? "gem" : "gold"),
            costs: infos.levels[i].costs,
            upgradeDuration: infos.levels[i].upgradeDuration
        });
        super({
            id: infos.id,
            name: infos.name,
            type: infos.name == "Wall" ? "wall" : "defense",
            village: "home",
            levels: easyArray,
            baseImageUrl: `Home/Defenses/${infos.name}`
        });
    };
};

interface DefenseInfo {
    id?: string;
    name: string;
    levels: Array<ClashOfClansLevel>;
};