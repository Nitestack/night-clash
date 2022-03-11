import Base from "@database/Boom Beach/Base";
import { BoomBeachLevel } from "@database/Boom Beach/Base";

export default class GunboatAbility extends Base {
    constructor(infos: GunboatAbilityInfo) {
        const easyArray: Array<BoomBeachLevel> = [];
        const basicImageUrl = `Gunboat Abilities/${infos.name}`;
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            ...infos.levels[i],
            costType: "gold",
            imageUrl: `/Images/Boom Beach/${basicImageUrl}.png`
        });
        super({
            name: infos.name,
            levels: easyArray,
            type: "gunboatAbility",
            baseImageUrl: basicImageUrl
        });
    };
};

interface GunboatAbilityInfo {
    name: string;
    levels: Array<BoomBeachLevel>;
};