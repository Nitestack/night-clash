export * from "@graphql/types/games.types/clashofclans";
export * from "@graphql/types/games.types/clashroyale";

import { ObjectType, Field, Int } from "type-graphql";

//Boom Beach

@ObjectType({ description: "A Boom Beach database island object" })
export class BoomBeachIsland {
    @Field()
    playerTag: string;
    @Field()
    name: string;
};

@ObjectType({ description: "A Boom Beach player object"})
export class BoomBeachPlayerProfile {
    @Field()
    playerTag: string;
    @Field()
    name: string;
    @Field(type => Int)
    expLevel: number;
};

//Clash Royale

@ObjectType({ description: "A Clash Royale database clan object" })
export class ClashRoyaleClanProfile {
    @Field()
    name: string;
    @Field()
    tag: string;
    @Field(type => Int)
    badgeId: number;
};

@ObjectType({ description: "A Clash Royale database player object" })
export class ClashRoyalePlayerProfile {
    @Field()
    name: string;
    @Field()
    tag: string;
    @Field(type => Int)
    expLevel: number;
    @Field(type => ClashRoyaleClanProfile, { nullable: true })
    clan?: ClashRoyaleClanProfile;
};

//Brawl Stars

@ObjectType({ description: "A Brawl Stars database club object" })
export class BrawlStarsClubProfile {
    @Field()
    name: string;
    @Field()
    tag: string;
};

@ObjectType({ description: "A Brawl Stars database player object" })
export class BrawlStarsPlayerProfile {
    @Field()
    name: string;
    @Field()
    tag: string;
    @Field(type => Int)
    iconId: number;
    @Field(type => BrawlStarsClubProfile, { nullable: true })
    club?: BrawlStarsClubProfile;
};