import { ObjectType, Int, Field } from "type-graphql";

export * from "@graphql/types/games.types/clashroyale/player";
export * from "@graphql/types/games.types/clashroyale/clan";

@ObjectType({ description: "A Clash Royale arena object "})
export class ClashRoyaleArena {
    @Field(type => Int)
    id: number;
    @Field()
    name: string;
};