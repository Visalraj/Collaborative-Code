import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

import randomUuidGenerator from "../../../components/common";

const { handlers } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async redirect({ baseUrl }) {
            const randomUuid = randomUuidGenerator();
            return `${baseUrl}/room/${randomUuid}`;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
