import Base from "@database/Boom Beach/Base"; 
import { BoomBeachLevel } from "@database/Boom Beach/Base";

export default class Support extends Base {
    constructor(infos: SupportInfo) {
        const easyArray: Array<BoomBeachLevel> = [];
        const basicImageUrl = `Support/${infos.name}`;
        for (let i = 0; i < infos.levels.length; i++) {
            const pushObject: BoomBeachLevel = {
                ...infos.levels[i],
                costType: "woodStoneIron"
            };
            if (infos.name == "Submarine") pushObject.imageUrl = `/Images/Boom Beach/${basicImageUrl}.png`;
            easyArray.push(pushObject);
        };
        super({
            name: infos.name,
            levels: easyArray,
            type: "support",
            baseImageUrl: basicImageUrl
        });
    };
};

interface SupportInfo {
    name: string;
    levels: Array<BoomBeachLevel>;
};