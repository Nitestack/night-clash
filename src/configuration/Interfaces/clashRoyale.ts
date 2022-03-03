export interface CRProfile {
    clan: {
        badgeId: number,
        tag: string,
        name: string
    },
    arena: {
        id: number,
        name: string
    },
    role: "elder" | "coLeader" | "member" | "leader",
    wins: number,
    losses: number,
    totalDonations: number,
    leagueStatistics?: {
        currentSeason: { id: string, rank?: number, trophies: number, bestTrophies: number },
        previousSeason: { id: string, rank?: number, trophies: number, bestTrophies: number },
        bestSeason: { id: string, rank?: number, trophies: number, bestTrophies: number }
    },
    cards: Array<CRCard>,
    currentFavouriteCard: {
        iconUrls: { medium: string },
        name: string,
        id: number,
        maxLevel: number
    },
    badges: Array<{
        maxLevel: number,
        progress: number,
        level: number,
        target: number,
        name: string
    }>,
    tag: string,
    name: string,
    expLevel: number,
    trophies: number,
    bestTrophies: number,
    donations: number,
    donationsReceived: number,
    achievements: Array<{
        stars: number,
        value: number,
        name: string,
        target: number,
        info: string,
        completionInfo: string
    }>,
    battleCount: number,
    threeCrownWins: number,
    challengeCardsWon: number,
    challengeMaxWins: number,
    tournamentCardsWon: number,
    tournamentBattleCount: number,
    currentDeck: Array<CRCard>,
    warDayWins: number,
    clanCardsCollected: number,
    starPoints: number,
    expPoints: number
};

export interface CRClan {
    tag: string,
    name: string,
    type: "inviteOnly" | "open" | "closed",
    description: string,
    badgeId: number,
    clanScore: number,
    clanWarTrophies: number,
    location: {
        localizedName?: string,
        id: number,
        name: string,
        isCountry: boolean,
        countryCode?: string
    },
    requiredTrophies: number,
    donationsPerWeek: number,
    clanChestStatus: string,
    clanChestLevel: number,
    clanChestMaxLevel: number,
    members: number,
    memberList: Array<{
        tag: string,
        name: string,
        role: "elder" | "coLeader" | "member" | "leader",
        lastSeen: string,
        expLevel: number,
        trophies: number,
        arena: {
            id: number,
            name: string
        },
        clanRank: number,
        previousClanRank: number,
        donations: number,
        donationsReceived: number,
        clanChestPoints: number
    }>
};

export interface CRCard {
    name: string,
    id: number,
    level: number,
    starLevel?: 1 | 2 | 3;
    maxLevel: number,
    count: number,
    iconUrls: {
        medium: string
    }
};