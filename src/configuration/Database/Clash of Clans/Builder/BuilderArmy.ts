import Base from "@database/Clash of Clans/Base"; 
import type { ClashOfClansLevel } from "@database/Clash of Clans/Base";

export default class BuilderArmy extends Base {
    constructor(infos: ArmyInfo) {
        const easyArray: Array<ClashOfClansLevel> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: "builderElixir",
            costs: infos.levels[i].costs,
            upgradeDuration: infos.levels[i].upgradeDuration
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "army",
            village: "builder",
            levels: easyArray,
            baseImageUrl: `Builder/Army/${infos.name}`
        });
    };
};

interface ArmyInfo {
    id?: string;
    name: string;
    levels: Array<ClashOfClansLevel>;
};