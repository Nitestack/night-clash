import Base from "@database/Boom Beach/Base";
import { BoomBeachLevel } from "@database/Boom Beach/Base";

export default class Hero extends Base {
    constructor(infos: HeroInfo) {
        const easyArray: Array<BoomBeachLevel> = [];
        const basicImageUrl = `Heroes/${infos.name}`;
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            ...infos.levels[i],
            costType: "gold",
            imageUrl: `/Images/Boom Beach/${basicImageUrl}.png`
        });
        super({
            name: infos.name,
            levels: easyArray,
            type: "hero",
            baseImageUrl: basicImageUrl
        });
    };
};

interface HeroInfo {
    name: string;
    levels: Array<BoomBeachLevel>;
};