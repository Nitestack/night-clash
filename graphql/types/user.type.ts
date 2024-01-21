import { Role } from ".prisma/client";
import { ObjectType, Field, ID, registerEnumType, InterfaceType } from "type-graphql";
import { BoomBeachPlayerProfile, BrawlStarsClubProfile, BrawlStarsPlayerProfile, ClashOfClansClanProfile, ClashOfClansPlayerProfile, ClashRoyaleClanProfile, ClashRoyalePlayerProfile } from "@graphql/types";

export type VillageType = Record<string, Record<string, number>>;

export type ClashOfClansVillageType = VillageType & {
    walls: {
        [key: string]: number
    },
    builder: {
        [key: string]: number
    }
};

registerEnumType(Role, {
    name: "Role",
    description: "The role of the user"
});

@InterfaceType({ description: "The base user interface" })
export abstract class BaseUser {
    @Field(type => ID)
    id: string;
    @Field()
    uid: string;
    @Field(type => Role)
    role: Role;
    @Field(type => [ClashOfClansPlayerProfile])
    clashOfClansStatsTrackerPlayers: Array<ClashOfClansPlayerProfile>;
    @Field(type => [ClashOfClansClanProfile])
    clashOfClansStatsTrackerClans: Array<ClashOfClansClanProfile>;
    @Field(type => [ClashRoyalePlayerProfile])
    clashRoyaleStatsTrackerPlayers: Array<ClashRoyalePlayerProfile>;
    @Field(type => [ClashRoyaleClanProfile])
    clashRoyaleStatsTrackerClans: Array<ClashRoyaleClanProfile>;
    @Field(type => [BrawlStarsPlayerProfile])
    brawlStarsStatsTrackerPlayers: Array<BrawlStarsPlayerProfile>;
    @Field(type => [BrawlStarsClubProfile])
    brawlStarsStatsTrackerClans: Array<BrawlStarsClubProfile>;
    @Field(type => [String])
    clashOfClansVillagesID: Array<string>;
    @Field(type => [String])
    boomBeachIslandsID: Array<string>;
};

@ObjectType({ description: "The user of the database", implements: BaseUser })
export class User extends BaseUser {

};



@ObjectType({ description: "The user of the database for the account page", implements: BaseUser })
export class AccountUser extends BaseUser {
    @Field(type => [ClashOfClansPlayerProfile])
    clashOfClansVillages: Array<ClashOfClansPlayerProfile>;
    @Field(type => [BoomBeachPlayerProfile])
    boomBeachIslands: Array<BoomBeachPlayerProfile>;
};