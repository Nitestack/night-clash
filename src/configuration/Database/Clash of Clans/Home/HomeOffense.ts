import Base, { ClashOfClansLevel } from "@database/Clash of Clans/Base";

export default class HomeOffense extends Base {
    constructor(infos: OffenseInfo) {
        const easyArray: Array<ClashOfClansLevel | ClashOfClansLevel & {
            text: string,
            requiredLabLevel: number
        }> = [];
        const basicImageUrl = `Home/${infos.type.toLowerCase().includes("troop") ? "Troops" : (infos.type == "spell" ? "Spells" : "Siege Machines")}/${infos.name}`;
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: infos.type == "siegeMachine" ? "elixir" : infos.costType,
            //@ts-ignore
            costs: infos.levels[i].text ? 0 : infos.levels[i].costs,
            //@ts-ignore
            upgradeDuration: infos.levels[i].text ? "0s" : infos.levels[i].upgradeDuration,
            //@ts-ignore
            text: infos.levels[i].text ? required(infos.levels[i].text) : null,
            //@ts-ignore
            requiredLabLevel: i == 0 ? null : infos.levels[i].requiredLabLevel,
            imageUrl: `/Images/${basicImageUrl}${infos.type == "spell" ? ".png" :  `/${i + 1}.png`}`
        });
        super({
            id: infos.id,
            name: infos.name,
            type: infos.type,
            village: "home",
            levels: easyArray,
            baseImageUrl: basicImageUrl
        });
    };
};

export function required(text: string) {
    const arrayOfText = text.split(" ");
    return `Level ${arrayOfText[arrayOfText.length - 1]} ${arrayOfText.slice(0, arrayOfText.length - 2).join(" ")} Required!`;
};

interface OffenseInfo {
    id?: string;
    name: string;
    levels: Array<ClashOfClansLevel & {
        text: string;
        requiredLabLevel: number;
    }>;
    costType?: "elixir" | "darkElixir";
    type: "troop" | "spell" | "siegeMachine" | "darkTroop"
};