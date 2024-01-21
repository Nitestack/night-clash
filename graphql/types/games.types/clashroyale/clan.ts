import { ClashRoyaleArena } from "@graphql/types";
import { ObjectType, Int, Field } from "type-graphql"

@ObjectType({ description: "A Clash Royale location object "})
export class ClashRoyaleLocation {
    @Field({ nullable: true })
    localizedName?: string;
    @Field(type => Int)
    id: number;
    @Field()
    name: string;
    @Field()
    isCountry: boolean;
    @Field({ nullable: true })
    countryCode?: string
};

@ObjectType({ description: "A Clash Royale clan member object" })
export class ClashRoyaleClanMember {
    @Field()
    tag: string;
    @Field()
    name: string;
    @Field()
    role: "elder" | "coLeader" | "member" | "leader";
    @Field()
    lastSeen: string;
    @Field(type => Int)
    expLevel: number;
    @Field(type => Int)
    trophies: number;
    @Field(type => ClashRoyaleArena)
    arena: ClashRoyaleArena;
    @Field(type => Int)
    clanRank: number;
    @Field(type => Int)
    previousClanRank: number;
    @Field(type => Int)
    donations: number;
    @Field(type => Int)
    donationsReceived: number;
    @Field(type => Int)
    clanChestPoints: number
};

@ObjectType({ description: "A Clash Royale clan object" })
export class ClashRoyaleClan {
    @Field()
    tag: string;
    @Field()
    name: string;
    @Field()
    type: "inviteOnly" | "open" | "closed";
    @Field()
    description: string;
    @Field(type => Int)
    badgeId: number;
    @Field(type => Int)
    clanScore: number;
    @Field(type => Int)
    clanWarTrophies: number;
    @Field(type => Int, { nullable: true })
    clanChestPoints: number;
    @Field(type => ClashRoyaleLocation)
    location: ClashRoyaleLocation;
    @Field(type => Int)
    requiredTrophies: number;
    @Field(type => Int)
    donationsPerWeek: number;
    @Field()
    clanChestStatus: string;
    @Field(type => Int)
    clanChestLevel: number;
    @Field(type => Int)
    clanChestMaxLevel: number;
    @Field(type => Int)
    members: number;
    @Field(type => [ClashRoyaleClanMember])
    memberList: Array<ClashRoyaleClanMember>
};