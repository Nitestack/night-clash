import { Client } from "clashofclans.js";
//@ts-ignore
import { Token, ClashRoyale, BrawlStars } from "supercell-apis";

export const client = new Client();

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.api;

if (!cached) cached = {  };

export interface APIClients {
    coc: Client,
    cr: any,
    bs: any
};

async function getAPI<K extends keyof APIClients>(api: K): Promise<APIClients[K]> {
    if (cached.coc && api == "coc") return cached.coc;
    else if (cached.cr && api == "cr") return cached.cr;
    else if (cached.bs && api == "bs") return cached.bs;
    if (api == "coc" && !cached.coc) {
        await client.login({ email: process.env.EMAIL as string, password: process.env.PASSWORD as string });
        cached.coc = client;
    } else if (api == "cr" && !cached.cr) {
        const token = await new Token("clashroyale", process.env.EMAIL, process.env.PASSWORD).init();
        cached.cr = new ClashRoyale(token);
    } else if (api == "bs" && !cached.bs) {
        const token = await new Token("brawlstars", process.env.EMAIL, process.env.PASSWORD).init();
        cached.bs = new BrawlStars(token);
    };
    if (api == "coc") return cached.coc;
    else if (api == "cr") return cached.cr;
    else if (api == "bs") return cached.bs;
};

export default getAPI;