import { ObjectType, Field, Int } from "type-graphql";
import type { APIBadge, APILeague, APIIcon, APILabel, APILocation, APIWarLeague } from "clashofclans.js";

export * from "@graphql/types/games.types/clashofclans/database";
export * from "@graphql/types/games.types/clashofclans/player";
export * from "@graphql/types/games.types/clashofclans/clan";

@ObjectType({ description: "A Clash of Clans badge object" })
export class ClashOfClansBadge implements APIBadge {
    @Field()
    small: string;
    @Field()
    large: string;
    @Field()
    medium: string;
};

@ObjectType({ description: "A Clash of Clans icon object" })
export class ClashOfClansIcon implements APIIcon {
    @Field()
    small: string;
    /** Tiny Icon is not available for Labels. */
    @Field({ nullable: true })
    tiny?: string;
    /** Medium Icon is not available for Unranked Icon. */
    @Field({ nullable: true })
    medium?: string;
};

@ObjectType({ description: "A Clash of Clans league object" })
export class ClashOfClansLeague implements APILeague {
    @Field(type => Int)
    id: number;
    @Field()
    name: string;
    @Field(type => ClashOfClansIcon)
    iconUrls: ClashOfClansIcon;
};

@ObjectType({ description: "A Clash of Clans label object" })
export class ClashOfClansLabel implements APILabel {
    @Field(type => Int)
    id: number;
    @Field()
    name: string;
    @Field(type => ClashOfClansIcon)
    iconUrls: ClashOfClansIcon;
};

@ObjectType({ description: "A Clash of Clans location object" })
export class ClashOfClansLocation implements APILocation {
    @Field({ nullable: true })
    localizedName?: string;
    @Field(type => Int)
    id: number;
    @Field()
    name: string;
    @Field()
    isCountry: boolean;
    @Field({ nullable: true })
    countryCode?: string;
};

@ObjectType({ description: "A Clash of Clans war league object "})
export class ClashOfClansWarLeague implements APIWarLeague {
    @Field(type => Int)
    id: number;
    @Field()
    name: string;
};