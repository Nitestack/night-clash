import Base from "@database/Boom Beach/Base"; 
import { BoomBeachLevel } from "@database/Boom Beach/Base";

export default class Troop extends Base {
    constructor(infos: TroopInfo) {
        const easyArray: Array<BoomBeachLevel> = [];
        const basicImageUrl = `Troops/${infos.name}`;
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            ...infos.levels[i],
            costType: "gold",
            imageUrl: `/Images/Boom Beach/${basicImageUrl}.png`
        });
        super({
            name: infos.name,
            levels: easyArray,
            type: "troop",
            baseImageUrl: basicImageUrl
        });
    };
};

interface TroopInfo {
    name: string;
    levels: Array<BoomBeachLevel>;
};