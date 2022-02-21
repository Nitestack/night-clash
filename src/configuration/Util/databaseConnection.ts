/** 
 * Source : 
 * https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/
import { connect } from "mongoose";

interface MongooseCache {
    conn: typeof import("mongoose"),
    promise: Promise<typeof import("mongoose")>,
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
//@ts-ignore
let cached: MongooseCache = global.mongoose;

if (!cached) {
    //@ts-ignore
    cached = global.mongoose = { conn: null, promise: null };
};

async function getDatabaseConnection(): Promise<typeof import("mongoose")> {
    if (cached.conn) {
        return cached.conn;
    };
    if (!cached.promise) {
        cached.promise = connect(process.env.MONGODB_URI as string, { bufferCommands: false }).then(mongoose => {
            mongoose.set("bufferCommands", false);
            return mongoose;
        });
    };
    cached.conn = await cached.promise;
    return cached.conn;
};

export default getDatabaseConnection;