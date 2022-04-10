import { ApolloServer } from "apollo-server-micro";
import { schema } from "@graphql/schema";
import type { NextApiRequest, NextApiResponse } from "next";

const apolloServer = new ApolloServer({ 
    schema: schema
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
        bodyParser: false,
    }
};