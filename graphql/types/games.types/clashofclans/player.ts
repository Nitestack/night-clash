import { ObjectType, Field, Int } from "type-graphql";
import type { APIPlayer, APIPlayerClan, APIPlayerItem, APIPlayerAchievement, APISeason, APILegendStatistics } from "clashofclans.js";
import { ClashOfClansBadge, ClashOfClansLeague, ClashOfClansLabel } from "@graphql/types";

@ObjectType({ description: "A clan of a Clash of Clans player object" })
export class ClashOfClansPlayerClan implements APIPlayerClan {
    @Field()
    tag: string;
    @Field()
    name: string;
    @Field(type => Int)
    clanLevel: number;
    @Field(type => ClashOfClansBadge)
    badgeUrls: ClashOfClansBadge;
};

@ObjectType({ description: "A Clash of Clans legend statistics object" })
export class ClashOfClansLegendStatistics implements APILegendStatistics {
    @Field(type => ClashOfClansSeason, { nullable: true })
    previousSeason?: APISeason;
    @Field(type => ClashOfClansSeason, { nullable: true })
    previousVersusSeason?: APISeason;
    @Field(type => ClashOfClansSeason, { nullable: true })
    bestVersusSeason?: APISeason;
    @Field(type => ClashOfClansSeason, { nullable: true })
    currentSeason?: APISeason;
    @Field(type => ClashOfClansSeason, { nullable: true })
    bestSeason?: APISeason;
    @Field(type => Int)
    legendTrophies: number;
};

@ObjectType({ description: "A Clash of Clans season object" })
export class ClashOfClansSeason implements APISeason {
    @Field({ nullable: true })
    id: string;
    @Field(type => Int, { nullable: true})
    rank: number;
    @Field(type => Int)
    trophies: number;
};

@ObjectType({ description: "A achievement of a Clash of Clans player object" }) 
export class ClashOfClansPlayerAchievement implements APIPlayerAchievement {
    @Field()
    name: string;
    @Field(type => Int)
    stars: number;
    @Field(type => Int)
    value: number;
    @Field(type => Int)
    target: number;
    @Field()
    info: string;
    @Field({ nullable: true })
    completionInfo: string;
    @Field()
    village: 'home' | 'builderBase';
};

@ObjectType({ description: "An item of a Clash of Clans player object" })
export class ClashOfClansPlayerItem implements APIPlayerItem {
    @Field()
    name: string;
    @Field(type => Int)
    level: number;
    @Field(type => Int)
    maxLevel: number;
    @Field({ nullable: true })
    superTroopIsActive?: boolean;
    @Field()
    village: 'home' | 'builderBase';
};

@ObjectType({ description: "A Clash of Clans player object" })
export class ClashOfClansPlayer implements APIPlayer {
    @Field()
    name: string;
    @Field()
    tag: string;
    @Field(type => Int)
    townHallLevel: number;
    @Field(type => Int, { nullable: true })
    townHallWeaponLevel?: number;
    @Field(type => Int)
    expLevel: number;
    @Field(type => Int)
    trophies: number;
    @Field(type => Int)
    bestTrophies: number;
    @Field(type => Int)
    warStars: number;
    @Field(type => Int)
    attackWins: number;
    @Field(type => Int)
    defenseWins: number;
    @Field(type => Int, { nullable: true })
    builderHallLevel?: number;
    @Field(type => Int, { nullable: true })
    versusTrophies?: number;
    @Field(type => Int, { nullable: true })
    bestVersusTrophies?: number;
    @Field(type => Int, { nullable: true })
    versusBattleWins?: number;
    @Field(type => Int)
    donations: number;
    @Field(type => Int)
    donationsReceived: number;
    @Field({ nullable: true })
    role?: string;
    @Field({ nullable: true })
    warPreference?: 'in' | 'out';
    @Field(type => ClashOfClansPlayerClan, { nullable: true })
    clan?: ClashOfClansPlayerClan;
    @Field(type => ClashOfClansLeague, { nullable: true })
    league?: ClashOfClansLeague;
    @Field(type => ClashOfClansLegendStatistics, { nullable: true })
    legendStatistics?: ClashOfClansLegendStatistics;
    @Field(type => [ClashOfClansPlayerAchievement])
    achievements: Array<ClashOfClansPlayerAchievement>;
    @Field(type => [ClashOfClansPlayerItem])
    troops: Array<ClashOfClansPlayerItem>;
    @Field(type => [ClashOfClansPlayerItem])
    heroes: Array<ClashOfClansPlayerItem>;
    @Field(type => [ClashOfClansPlayerItem])
    spells: Array<ClashOfClansPlayerItem>;
    @Field(type => [ClashOfClansLabel])
    labels: Array<ClashOfClansLabel>;
};