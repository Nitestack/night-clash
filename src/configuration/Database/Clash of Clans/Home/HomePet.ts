import Base, { ClashOfClansLevel } from "@database/Clash of Clans/Base";
import { required } from "@database/Clash of Clans/Home/HomeOffense";

export default class HomePet extends Base {
    constructor(infos: HeroInfo) {
        const easyArray: Array<ClashOfClansLevel | ClashOfClansLevel & {
            text: string,
            requiredLabLevel: number
        }> = [];
        const basicImageUrl = `Home/Pets/${infos.name}`;
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: "darkElixir",
            //@ts-ignore
            costs: infos.levels[i].text ? 0 : infos.levels[i].costs,
            //@ts-ignore
            upgradeDuration: infos.levels[i].text ? "0s" : infos.levels[i].upgradeDuration,
            //@ts-ignore
            text: infos.levels[i].text ? required(infos.levels[i].text) : null,
            imageUrl: `/Images/Clash of Clans/${basicImageUrl}.png`
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "pet",
            village: "home",
            levels: easyArray,
            baseImageUrl: basicImageUrl,
            levelNullImagePath: `/Images/Clash of Clans/${basicImageUrl}.png`
        });
    };
};

interface HeroInfo {
    id?: string;
    name: string;
    levels: Array<ClashOfClansLevel & {
        text?: string
    }>;
};