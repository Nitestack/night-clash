//@ts-nocheck
import Util from "@util/index";
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@util/mongoDB";

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "your credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "E-Mail", type: "email", placeholder: "E-Mail" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: "J Smith", email: "jsmith@example.com" }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const response = await Util.Axios.post("/api/user/authorize", {
                    email: credentials?.email,
                    password: credentials?.password
                });
                const user = response.data;
                // If no error and we have user data, return it
                if (response.status == 200 && user) return user;
                else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter        
                };
            }
        })
    ],
    pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/login"
    },
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    debug: process.env.NODE_ENV == "development"
});