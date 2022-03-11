import { Client } from "clashofclans.js";
//@ts-ignore
import { Token, ClashRoyale, BrawlStars } from "supercell-apis";

const client = new Client();

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: {
    CoCClient: Client;
    CRClient: any,
    BSClient: any
//@ts-ignore
} = global.api;

if (!cached) {
    //@ts-ignore
    cached = global.api = { CoCClient: null, CRClient: null, BSClient: null };
};

async function getAPI(api: "coc" | "cr" | "bs"): Promise<Client | any> {
    if (cached.CoCClient && api == "coc") return cached.CoCClient;
    else if (cached.CRClient && api == "cr") return cached.CRClient;
    else if (cached.BSClient && api == "bs") return cached.BSClient;
    if (api == "coc" && !cached.CoCClient) {
        await client.login({ email: process.env.EMAIL as string, password: process.env.PASSWORD as string });
        cached.CoCClient = client;
    } else if (api == "cr" && !cached.CRClient) {
        const token = await new Token("clashroyale", process.env.EMAIL, process.env.PASSWORD).init();
        cached.CRClient = new ClashRoyale(token);
    } else if (api == "bs" && !cached.BSClient) {
        const token = await new Token("brawlstars", process.env.EMAIL, process.env.PASSWORD).init();
        cached.BSClient = new BrawlStars(token);
    };
    if (api == "coc") return cached.CoCClient;
    else if (api == "cr") return cached.CRClient;
    else if (api == "bs") return cached.BSClient;
};

export default getAPI;