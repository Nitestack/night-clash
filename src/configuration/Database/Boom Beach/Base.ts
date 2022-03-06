import { convertNumber, convertTime } from "@util/functions";

export default class Base {
    constructor(infos: BaseInfo){
        this.name = infos.name;
        this.type = infos.type;
        const convertedLevels: Array<BoomBeachConvertedLevel> = [];
        for (const level of infos.levels) convertedLevels.push({
            convertedPrice: level.costs.map((cost) => convertNumber(cost)),
            upgradeDurationInSeconds: convertTime(level.upgradeDuration),
            imageUrl: `/Images/Boom Beach/${infos.baseImageUrl}/${infos.levels.indexOf(level) + 1}.png`,
            ...level
        });
        this.levels = convertedLevels;
        this.maxLevel = infos.levels.length;
    };
    public name: string;
    public type: Type;
    public maxLevel: number;
    public levels: Array<BoomBeachConvertedLevel | BoomBeachConvertedLevel & {
        requiredArmoryLevel: number;
    }>;
};

export type Type = "defense" | "economy" | "support" | "mine" | "troop" | "gunboatAbility" | "hero" | "heroAbility";
export type Village = "home" |  "builder";

interface BaseInfo {
    name: string;
    type: Type;
    levels: Array<BoomBeachLevel | BoomBeachLevel & {
        requiredArmoryLevel: number;
    }>;
    baseImageUrl: string;
};

type BoomBeachConvertedLevel = BoomBeachLevel & {
    convertedPrice: Array<string>;
    upgradeDurationInSeconds: number;
    imageUrl: string;
    costType?: "gold" | "heroToken" | "woodStoneIron" | "stoneIron" | "woodIron" | "woodStone";
};

export interface BoomBeachLevel {
    costType?: "gold" | "heroToken" | "woodStoneIron" | "stoneIron" | "woodIron" | "woodStone";
    costs: Array<number>;
    upgradeDuration: string;
    expPoints?: number;
    imageUrl?: string;
};