import Base, { ClashOfClansLevel } from "@database/Clash of Clans/Base";

export default class HomeArmy extends Base {
    constructor(infos: ArmyInfo) {
        const easyArray: Array<ClashOfClansLevel> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: "elixir",
            costs: infos.levels[i].costs,
            upgradeDuration: infos.levels[i].upgradeDuration
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "army",
            village: "home",
            levels: easyArray,
            baseImageUrl: `Home/Army/${infos.name}`
        });
    };
};

interface ArmyInfo {
    id?: string;
    name: string;
    levels: Array<ClashOfClansLevel>;
};