import Base, { ClashOfClansLevel } from "@database/Clash of Clans/Base";

export default class HomeHero extends Base {
    constructor(infos: HeroInfo) {
        const easyArray: Array<ClashOfClansLevel> = [];
        const basicImageUrl = `Home/Heroes/${infos.name}`;
        for (let i = 1; i < infos.levels.length + 1; i++) {
            let imageLevel = 0;
            if (infos.name == "Barbarian King" || infos.name == "Archer Queen") {
                imageLevel = i;
                if (i >= 1 && i < 10) imageLevel = 1;
                else if (i >= 10 && i < 20) imageLevel = 10;
                else if (i >= 20 && i < 41) imageLevel = 20;
                else if (i >= 41) imageLevel = 41;
            } else {
                imageLevel = i;
                if (i >= 1) imageLevel = 1;
            };
            easyArray.push({
                costType: infos.name == "Grand Warden" ? "elixir" : "darkElixir",
                costs: infos.levels[i - 1].costs,
                upgradeDuration: infos.levels[i - 1].upgradeDuration,
                imageUrl: `/Images/Clash of Clans/${basicImageUrl}/${imageLevel}.png`
            });
        };
        super({
            id: infos.id,
            name: infos.name,
            type: "hero",
            village: "home",
            levels: easyArray,
            baseImageUrl: basicImageUrl
        });
    };
};

interface HeroInfo {
    id?: string;
    name: string;
    levels: Array<ClashOfClansLevel>;
};