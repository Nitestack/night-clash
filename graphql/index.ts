import { buildSchema } from "type-graphql";
import { UserResolver } from "@graphql/types/user.resolver";
import { StatsResolver } from "@graphql/types/stats.resolver";
import { join } from "path";

export const schema = await buildSchema({
    resolvers: [UserResolver, StatsResolver],
    orphanedTypes: [],
    emitSchemaFile: join(process.cwd(), "graphql", "schema.graphql")
});