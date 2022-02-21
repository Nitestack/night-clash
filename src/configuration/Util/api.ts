import { Client } from "clashofclans.js";
//@ts-ignore
import { Token, ClashRoyale } from "supercell-apis";

const client = new Client();

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
//@ts-ignore
let cached = global.api;

if (!cached) {
    //@ts-ignore
    cached = global.api = { CoCClient: null, CRClient: null };
};

async function getAPI(api: "coc" | "cr"): Promise<Client | any> {
    if (cached.CoCClient && api == "coc") return cached.CoCClient;
    else if (cached.CRClient && api == "cr") return cached.CRClient;
    if (api == "coc" && !cached.COCClient) {
        await client.login({ email: "night.clash.tracker@gmail.com", password: process.env.PASSWORD as string });
        cached.CoCClient = client;
    } else if (api == "cr" && !cached.CRClient) {
        const token = await new Token("clashroyale", "night.clash.tracker@gmail.com", process.env.PASSWORD).init();
        cached.CRClient = new ClashRoyale(token);
    };
    if (api == "coc") return cached.CoCClient;
    else if (api == "cr") return cached.CRClient;
};

export default getAPI;