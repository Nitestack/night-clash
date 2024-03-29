import { convertNumber, convertTime, convertMilliseconds } from "@util/functions";

export default class Base {
    constructor(infos: BaseInfo){
        this.name = infos.name;
        this.type = infos.type;
        this.village = infos.village;
        const convertedLevels: Array<ClashOfClansConvertedLevel> = [];
        for (const level of infos.levels) convertedLevels.push({
            imageUrl: `/Images/Clash of Clans/${infos.baseImageUrl}/${infos.levels.indexOf(level) + 1}.png`,
            convertedPrice: convertNumber(level.costs),
            upgradeDurationInSeconds: convertTime(level.upgradeDuration),
            calculateSeasonBoostCosts: (percentage: number) => {
                return level.costs - (percentage / 100 * level.costs);
            },
            calculateSeasonBoostTimeInSeconds: (percentage: number) => {
                if (percentage == 0 || level.upgradeDuration == "0s") return convertTime(level.upgradeDuration);
                const upgradeDurationInMS = convertTime(level.upgradeDuration) * 1000;
                let time = convertMilliseconds(upgradeDurationInMS - ((percentage / 100) * upgradeDurationInMS), true);
                let arrayOfTime = time.split(" ");
                if (arrayOfTime.length >= 2) time = `${arrayOfTime[0]} ${arrayOfTime[1]}`;
                if (time.includes("m")) {
                    const newArrayOfTime = time.split(" ");
                    for (let i = 0; i < newArrayOfTime.length; i++) {
                        if (newArrayOfTime[i].toLowerCase().includes("m") && newArrayOfTime[i].length - 1 == 2 && (newArrayOfTime.length == 2 ? true : parseInt(newArrayOfTime[i].slice(0, 2)) > 20)) {
                            newArrayOfTime.splice(i, 1, `${Math.floor(parseInt(newArrayOfTime[i]) / 10)}0m`);
                            break;
                        };
                    };
                    time = newArrayOfTime.join(" ");
                };
                return convertTime(time);
            },
            //Default fallback
            costType: "gold",
            ...level
        });
        this.levels = convertedLevels;
        this.maxLevel = infos.levels.length;
        this.levelNullImagePath = infos.levelNullImagePath ? infos.levelNullImagePath : `/Images/Clash of Clans/${infos.baseImageUrl}/0.png`;
    };
    public name: string;
    public type: Type;
    public village: Village;
    public maxLevel: number;
    public levels: Array<ClashOfClansConvertedLevel>;
    public levelNullImagePath: string;
};

type Type = "defense" | "resource" | "army" | "trap" | "troop" | "spell" | "hero" | "pet" | "siegeMachine" | "darkTroop" | "wall";
type Village = "home" |  "builder";

interface BaseInfo {
    name: string;
    id?: string;
    village: Village;
    type: Type;
    levels: Array<ClashOfClansLevel>;
    baseImageUrl: string;
    levelNullImagePath?: string;
};

interface ClashOfClansConvertedLevel {
    convertedPrice: string;
    upgradeDurationInSeconds: number;
    calculateSeasonBoostCosts: (percentage: number) => number;
    calculateSeasonBoostTimeInSeconds: (percentage: number) => number;
    imageUrl: string;
    text?: string;
    requiredLabLevel?: number;
    costType: "gold" | "elixir" | "darkElixir" | "builderGold" | "builderElixir" | "goldAndElixir" | "builderGoldAndElixir" | "gem";
    upgradeDuration: string;
    costs: number;
};

export interface ClashOfClansLevel {
    costType?: "gold" | "elixir" | "darkElixir" | "builderGold" | "builderElixir" | "goldAndElixir" | "builderGoldAndElixir" | "gem";
    costs: number;
    upgradeDuration: string;
    imageUrl?: string;
};