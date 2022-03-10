import { User } from "@models/user";
import Util from "@util/index";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import omit from "omit";

export default NextAuth({
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
                emailOrUsername: { label: "E-Mail or Username", type: "text", placeholder: "E-Mail or Username" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: "J Smith", email: "jsmith@example.com" }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const response = await Util.Axios.post("/api/auth/authorize", credentials, {
                    baseURL: process.env.NEXTAUTH_URL
                });
                const user: User = response.data;
                // If no error and we have user data, return it
                if (response.status == 200 && user) {
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter        
                };
            }
        })
    ],
    pages: {
        signIn: "/login",
        signOut: "/logout"
    },
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    callbacks: {
        async jwt({ token, account, profile, user, isNewUser }) {
            let newToken = token;
            // Persist the OAuth access_token to the token right after signin
            if (user) {
                newToken.customUser = omit("hash", user);
            };
            if (account) {
                newToken.accessToken = account.access_token;
            };
            return newToken;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken;
            //Assigning the users information
            //@ts-ignore
            session.user = { ...omit("email", session.user), ...token.customUser };
            return session;
        }
    },
    debug: process.env.NODE_ENV == "development"
});