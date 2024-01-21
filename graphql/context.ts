import { PrismaClient } from ".prisma/client";
import type { APIClients } from "@util/api";
import getAPI from "@util/api";
import { prisma } from "@util/prisma";

export type Context = {
    prisma: PrismaClient;
    api: APIClients;
};

const context: Context = {
    prisma: prisma,
    api: {
        coc: await getAPI("coc"),
        bs: await getAPI("bs"),
        cr: await getAPI("cr")
    }
};

export default context;