import { ObjectType, Field, Int } from "type-graphql";
import { ClashRoyaleArena } from "@graphql/types"

@ObjectType({ description: "A Clash Royale player clan object" })
export class ClashRoyalePlayerClan {
    @Field(type => Int)
    badgeId: number;
    @Field()
    tag: string;
    @Field()
    name: string;
};

@ObjectType({ description: "A Clash Royale season" })
export class ClashRoyaleSeason {
    @Field({ nullable: true })
    id: string;
    @Field(type => Int, { nullable: true })
    rank?: number;
    @Field(type => Int)
    trophies: number;
    @Field(type => Int, { nullable: true })
    bestTrophies: number;
};

@ObjectType({ description: "A Clash Royale league statistics" })
export class ClashRoyaleLeagueStatistics {
    //No ID
    @Field(type => ClashRoyaleSeason)
    currentSeason: Omit<ClashRoyaleSeason, "id">;
    @Field(type => ClashRoyaleSeason)
    previousSeason: ClashRoyaleSeason;
    //No best trophies
    @Field(type => ClashRoyaleSeason)
    bestSeason: Omit<ClashRoyaleSeason, "bestTrophies">;
};

@ObjectType({ description: "A Clash Royale icon url card object "})
export class ClashRoyaleCardIcon {
    @Field()
    medium: string;
};

@ObjectType({ description: "A Clash Royale card object" })
export class ClashRoyaleCard {
    @Field()
    name: string;
    @Field(type => Int)
    id: number;
    @Field(type => Int)
    level: number;
    @Field(type => Int, { nullable: true })
    starLevel?: 1 | 2 | 3;
    @Field(type => Int)
    maxLevel: number;
    @Field(type => Int)
    count: number;
    @Field(type => ClashRoyaleCardIcon)
    iconUrls: ClashRoyaleCardIcon;
};

@ObjectType({ description: "A Clash Royale icon url badge object" })
export class ClashRoyaleBadgeIcon {
    @Field()
    large: string;
};

@ObjectType({ description: "A Clash Royale badge object" })
export class ClashRoyaleBadge {
    @Field(type => Int)
    maxLevel: number;
    @Field(type => Int)
    progress: number;
    @Field(type => Int)
    level: number;
    @Field(type => Int)
    target: number;
    @Field()
    name: string;
    @Field(type => ClashRoyaleBadgeIcon)
    iconUrls: ClashRoyaleBadgeIcon;
};

@ObjectType({ description: "A Clash Royale achievement"})
export class ClashRoyaleAchievement {
    @Field(type => Int)
    stars: number;
    @Field(type => Int)
    value: number;
    @Field()
    name: string;
    @Field(type => Int)
    target: number;
    @Field()
    info: string;
    @Field({ nullable: true })
    completionInfo: string;
};

@ObjectType({ description: "A Clash Royale upcoming chest object"})
export class ClashRoyaleUpcomingChest {
    @Field(type => Int)
    index: number;
    @Field()
    name: string;
};

@ObjectType({ description: "A Clash Royale battle log player object" })
export class ClashRoyaleBattleLogPlayer {
    @Field()
    tag: string;
    @Field()
    name: string;
    @Field(type => Int, { nullable: true })
    startingTrophies?: number;
    @Field(type => Int, { nullable: true})
    crowns?: number;
    @Field(type => Int, { nullable: true })
    kingTowerHitPoints?: number;
    @Field(type => [Int], { nullable: true })
    princessTowersHitPoints?: Array<number>;
    @Field(type => ClashRoyalePlayerClan, { nullable: true })
    clan?: ClashRoyalePlayerClan;
    @Field(type => [ClashRoyaleCard])
    cards?: Array<Omit<ClashRoyaleCard, "count">>;
    @Field(type => Int, { nullable: true })
    trophyChange?: number;
};

@ObjectType({ description: "A Clash Royale battle log item object" })
export class ClashRoyaleBattleLogItem {
    @Field(type => ClashRoyaleArena)
    gameMode: ClashRoyaleArena;
    @Field(type => ClashRoyaleArena)
    arena: ClashRoyaleArena;
    @Field()
    deckSelection: "collection" | "draft" | "draft_competitive" | "predefined" | "event_deck" | "pick" | "wardeck_pick" | "unknown";
    @Field(type => [ClashRoyaleBattleLogPlayer], { nullable: true })
    opponent?: Array<ClashRoyaleBattleLogPlayer>;
    @Field(type => [ClashRoyaleBattleLogPlayer], { nullable: true })
    team?: Array<ClashRoyaleBattleLogPlayer>;
    @Field()
    type: "pvp" | "pve" | "clanmate" | "tournament" | "friendly" | "survival" | "pvp2v2" | "clanmate2v2" | "challenge2v2" | "clanwar_collection_day" | "clanwar_war_day" | "casual_1v1" | "casual_2v2" | "boat_battle" | "boat_battle_practice" | "river_race_pvp" | "river_race_duel" | "river_race_duel_colosseum" | "unknown";
    @Field()
    battleTime: string;
    @Field()
    isLadderTournament: boolean;
    @Field()
    isHostedMatch: boolean;
    @Field(type => Int, { nullable: true })
    challengeId?: number;
    @Field({ nullable: true })
    tournamentTag?: string;
    @Field({ nullable: true })
    challengeTitle?: string;
    @Field(type => Int, { nullable: true })
    challengeWinCountBefore?: number;
    @Field({ nullable: true })
    boatBattleSide?: string;
    @Field({ nullable: true })
    boatBattleWon?: boolean;
    @Field(type => Int, { nullable: true })
    newTowersDestroyed?: number;
    @Field(type => Int, { nullable: true })
    prevTowersDestroyed?: number;
    @Field(type => Int, { nullable: true })
    remainingTowers?: number;
};

@ObjectType({ description: "A Clash Royale player object" })
export class ClashRoyalePlayer {
    @Field(type => ClashRoyalePlayerClan, { nullable: true })
    clan?: ClashRoyalePlayerClan
    @Field(type => ClashRoyaleArena)
    arena: ClashRoyaleArena;
    @Field({ nullable: true })
    role?: "elder" | "coLeader" | "member" | "leader" ;
    @Field(type => Int)
    wins: number;
    @Field(type => Int)
    losses: number;
    @Field(type => Int)
    totalDonations: number;
    @Field(type => ClashRoyaleLeagueStatistics, { nullable: true })
    leagueStatistics?: ClashRoyaleLeagueStatistics;
    @Field(type => [ClashRoyaleCard])
    cards: Array<ClashRoyaleCard>;
    //No level, no count, no star level
    @Field(type => ClashRoyaleCard, { nullable: true })
    currentFavouriteCard?: Pick<ClashRoyaleCard, "name" | "iconUrls" | "maxLevel" | "id">;
    @Field(type => [ClashRoyaleBadge])
    badges: Array<ClashRoyaleBadge>;
    @Field()
    tag: string;
    @Field()
    name: string;
    @Field(type => Int)
    expLevel: number;
    @Field(type => Int)
    trophies: number;
    @Field(type => Int)
    bestTrophies: number;
    @Field(type => Int)
    donations: number;
    @Field(type => Int)
    donationsReceived: number;
    @Field(type => [ClashRoyaleAchievement])
    achievements: Array<ClashRoyaleAchievement>;
    @Field(type => Int)
    battleCount: number;
    @Field(type => Int)
    threeCrownWins: number;
    @Field(type => Int)
    challengeCardsWon: number;
    @Field(type => Int)
    challengeMaxWins: number;
    @Field(type => Int)
    tournamentCardsWon: number;
    @Field(type => Int)
    tournamentBattleCount: number;
    @Field(type => [ClashRoyaleCard])
    currentDeck: Array<ClashRoyaleCard>;
    @Field(type => Int)
    warDayWins: number;
    @Field(type => Int)
    clanCardsCollected: number;
    @Field(type => Int, { nullable: true })
    starPoints?: number;
    @Field(type => Int)
    expPoints: number;
    @Field(type => [ClashRoyaleUpcomingChest])
    upcomingChests: Array<ClashRoyaleUpcomingChest>
    @Field(type => [ClashRoyaleBattleLogItem])
    battleLog: Array<ClashRoyaleBattleLogItem>;
};