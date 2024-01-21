import { ObjectType, Field, Int } from "type-graphql";
import type { APIPlayer } from "clashofclans.js";
import { ClashOfClansPlayer } from "@graphql/types";

@ObjectType({ description: "A Clash of Clans database player object" })
export class ClashOfClansVillage {
    @Field()
    playerTag: string;
    @Field(type => ClashOfClansPlayer)
    player: APIPlayer;
};

@ObjectType({ description: "A Clash of Clans database clan object" })
export class ClashOfClansClanProfile {
    @Field()
    name: string;
    @Field()
    tag: string;
    @Field()
    iconUrl: string;
};

@ObjectType({ description: "A Clash of Clans database player object" })
export class ClashOfClansPlayerProfile {
    @Field()
    name: string;
    @Field()
    tag: string;
    @Field(type => Int)
    townHallLevel: number;
    @Field(type => Int, { nullable: true })
    townHallWeaponLevel?: number;
    @Field(type => ClashOfClansClanProfile, { nullable: true })
    clan?: ClashOfClansClanProfile;
};