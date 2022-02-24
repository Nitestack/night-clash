import Base, { ClashOfClansLevel } from "@database/Clash of Clans/Base";

export default class BuilderTrap extends Base {
    constructor(infos: TrapInfo) {
        const easyArray: Array<ClashOfClansLevel> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: "builderGold",
            costs: infos.levels[i].costs,
            upgradeDuration: infos.levels[i].upgradeDuration
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "trap",
            village: "builder",
            levels: easyArray,
            baseImageUrl: `Builder/Traps/${infos.name}`
        });
    };
};

interface TrapInfo {
    id?: string;
    name: string;
    levels: Array<ClashOfClansLevel>;
};