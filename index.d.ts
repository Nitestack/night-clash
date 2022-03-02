declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly MONGODB_URI: string,
            readonly PASSWORD: string,
            readonly AUTH_SECRET: string,
            readonly JWT_SECRET: string,
            readonly NEXTAUTH_URL: string
        }
    }
}