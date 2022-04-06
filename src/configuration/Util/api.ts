import { Client } from "clashofclans.js";
//@ts-ignore
import { Token, ClashRoyale, BrawlStars } from "supercell-apis";

const cocClient = new Client();

cocClient.login({ email: process.env.EMAIL as string, password: process.env.PASSWORD as string }).catch(err => console.error(err));

const crClient = new ClashRoyale(new Token("clashroyale", process.env.EMAIL, process.env.PASSWORD).init().then((token: string) => token));

const bsClient = new BrawlStars(new Token("brawlstars", process.env.EMAIL, process.env.PASSWORD).init().then((token: string) => token));

export { cocClient, crClient, bsClient };