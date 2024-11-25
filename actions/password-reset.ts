"use server";

import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const passwordReset = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const validatedFields = ResetPasswordSchema.safeParse(values);


    if (!validatedFields.success) {
        return {error: "Invalid email or password"};
    }

    const {email} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser ) {
        return {error: "Email does not exist"};
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return {success: "Please check your email: " + email + ", for a password reset link" };
}
