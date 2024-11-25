"use server";

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email or password" };
  }

  // Perform login logic here
  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "Invalid email or password" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await getVerificationTokenByEmail(existingUser.email);

    if (!verificationToken?.token) {
        return { error: "Verification token is missing or invalid. Please try again." };
    }

    await sendVerificationEmail(existingUser.email, verificationToken.token);

    return { success: "Please check your email for a verification link sent to: " + email };
}

  if(existingUser.isTwoFactorEnabled && existingUser.email){
    if (code){
    const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

    if (!twoFactorToken) {
        return { error: "Invalid two-factor code. Please try again." };
    }

    if (twoFactorToken.token !== code) {
        return { error: "Invalid two-factor code. Please try again." };
    }

    const hasExpired = new Date(twoFactorToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Two-factor code has expired. Please try again." };
    }
    await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
    });

    const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

    if(existingConfirmation ){
      await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
      });
    }

    await db.twoFactorConfirmation.create({
        data: {
            userId: existingUser.id,
        }
    });

  } else {
    const twoFactorToken = await generateTwoFactorToken(existingUser.email);

    await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

    return {twoFactor: true}
      }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Logged in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
