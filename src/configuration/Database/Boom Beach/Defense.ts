import Base, { BoomBeachLevel } from "@database/Boom Beach/Base";

export default class Defense extends Base {
    constructor(infos: DefenseInfo) {
        const easyArray: Array<BoomBeachLevel> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            ...infos.levels[i],
            costType: "woodStoneIron"
        });
        super({
            name: infos.name,
            levels: easyArray,
            type: "defense",
            baseImageUrl: `Defenses/${infos.name}`
        });
    };
};

interface DefenseInfo {
    name: string;
    levels: Array<BoomBeachLevel>;
};