import Base from "@database/Boom Beach/Base";
import { BoomBeachLevel } from "@database/Boom Beach/Base";

export default class Economy extends Base {
    constructor(infos: EconomyInfo) {
        const easyArray: Array<BoomBeachLevel> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            ...infos.levels[i],
            costType: infos.name == "Iron Mine" ? "woodStone" : (infos.name == "Sawmill" ? "stoneIron" : (infos.name == "Quarry" ? "woodIron" : "woodStoneIron"))
        });
        super({
            name: infos.name,
            levels: easyArray,
            type: "economy",
            baseImageUrl: `Economy/${infos.name}`
        });
    };
};

interface EconomyInfo {
    name: string;
    levels: Array<BoomBeachLevel>;
};