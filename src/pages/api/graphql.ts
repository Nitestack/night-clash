import "reflect-metadata";
import context from "@graphql/context";
import { ApolloServer } from "apollo-server-micro";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "@graphql/index";

const apolloServer = new ApolloServer({ 
    schema: schema,
    context: context
});

const startServer = apolloServer.start();

const GraphQL = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    };
    await startServer;
    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
};

export default GraphQL;

export const config = {
    api: {
        bodyParser: false
    }
};