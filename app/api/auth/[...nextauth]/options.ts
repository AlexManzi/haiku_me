import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';

interface Profile {
    sub: string;
    email: string;
};

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            profile(profile: Profile) {
                let userRole: string | undefined;
                return {
                    ...profile,
                    id: profile.sub,
                    email: profile.email,
                };
            },
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET_KEY as string
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        }
    }
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);