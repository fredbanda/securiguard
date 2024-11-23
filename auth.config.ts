// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/user";

export default {
    providers: [ 
        Credentials({
            async authorize(credentials) {
                const validatedFields = await LoginSchema.safeParse(credentials);

                if (validatedFields.success){
                    const {email, password} = validatedFields.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) return null;

                    const isPasswordMatch = await bcrypt.compare(password, user.password);

                    if (isPasswordMatch) return user;
                }
                return null;
            }
        })
    ]
} satisfies NextAuthConfig;