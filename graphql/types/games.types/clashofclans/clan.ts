import { ObjectType, Field, Int } from "type-graphql";
import type { APIClan, APIChatLanguage, APIClanMember } from "clashofclans.js";
import { ClashOfClansBadge, ClashOfClansLabel, ClashOfClansLeague, ClashOfClansLocation, ClashOfClansWarLeague } from "@graphql/types";

@ObjectType({ description: "A Clash of Clans chat language object" })
export class ClashOfClansChatLanguage implements APIChatLanguage {
    @Field()
    name: string;
    @Field(type => Int)
    id: number;
    @Field()
    languageCode: string;
};

@ObjectType({ description: "A Clash of Clans clan member object" })
export class ClashOfClansClanMember implements APIClanMember {
    @Field()
    name: string;
    @Field()
    tag: string;
    @Field()
    role: 'member' | 'admin' | 'coLeader' | 'leader';
    @Field(type => Int)
    expLevel: number;
    @Field(type => ClashOfClansLeague)
    league: ClashOfClansLeague;
    @Field(type => Int)
    trophies: number;
    @Field(type => Int, { nullable: true })
    versusTrophies?: number;
    @Field(type => Int)
    clanRank: number;
    @Field(type => Int)
    previousClanRank: number;
    @Field(type => Int)
    donations: number;
    @Field(type => Int)
    donationsReceived: number;
};

@ObjectType({ description: "A Clash of Clans clan object" })
export class ClashOfClansClan implements APIClan {
    @Field()
    tag: string;
    @Field()
    name: string;
    @Field()
    type: 'open' | 'inviteOnly' | 'closed';
    @Field()
    description: string;
    @Field(type => ClashOfClansLocation, { nullable: true })
    location?: ClashOfClansLocation;
    @Field(type => ClashOfClansChatLanguage, { nullable: true })
    chatLanguage?: ClashOfClansChatLanguage;
    @Field(type => ClashOfClansBadge)
    badgeUrls: ClashOfClansBadge;
    @Field(type => Int)
    clanLevel: number;
    @Field(type => Int)
    clanPoints: number;
    @Field(type => Int)
    clanVersusPoints: number;
    @Field(type => Int)
    requiredTrophies: number;
    @Field(type => Int, { nullable: true })
    requiredTownhallLevel?: number;
    @Field()
    warFrequency: 'always' | 'moreThanOncePerWeek' | 'oncePerWeek' | 'lessThanOncePerWeek' | 'never' | 'unknown';
    @Field(type => Int)
    warWinStreak: number;
    @Field(type => Int)
    warWins: number;
    @Field(type => Int, { nullable: true })
    warTies?: number;
    @Field(type => Int, { nullable: true })
    warLosses?: number;
    @Field({ nullable: true })
    isWarLogPublic: boolean;
    @Field(type => ClashOfClansWarLeague, { nullable: true })
    warLeague?: ClashOfClansWarLeague;
    @Field(type => Int)
    members: number;
    @Field(type => [ClashOfClansLabel])
    labels: Array<ClashOfClansLabel>;
    @Field(type => [ClashOfClansClanMember])
    memberList: Array<ClashOfClansClanMember>;
};