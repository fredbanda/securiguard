// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/user";

export default {
    providers: [ 
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET}),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET}),
        Credentials({
            async authorize(credentials) {
                const validatedFields = await LoginSchema.safeParse(credentials);

                if (validatedFields.success){
                    const {email, password} = validatedFields.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) return null;

                    const isPasswordMatch = await bcrypt.compare(password, user.password);

                    if (isPasswordMatch) {
                        // Only return the necessary fields
                        return {
                            id: user.id,         // Ensure `id` is included
                            email: user.email,
                            emailVerified: user.emailVerified,
                        };
                    }
                }
                return null;
            }
        })
    ]
} satisfies NextAuthConfig;