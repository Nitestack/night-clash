import Base, { ClashOfClansLevel } from "@database/Clash of Clans/Base";

export default class HomeTrap extends Base {
    constructor(infos: TrapInfo) {
        const easyArray: Array<ClashOfClansLevel> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: "gold",
            costs: infos.levels[i].costs,
            upgradeDuration: infos.levels[i].upgradeDuration
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "trap",
            village: "home",
            levels: easyArray,
            baseImageUrl: `Home/Traps/${infos.name}`
        });
    };
};

interface TrapInfo {
    id?: string;
    name: string;
    levels: Array<ClashOfClansLevel>;
};