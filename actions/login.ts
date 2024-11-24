"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { sendVerificationEmail } from "@/lib/mail";
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
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "Invalid email or password" };
  }

  // if (!existingUser.emailVerified) {
  //   const verificationToken = await getVerificationTokenByEmail(existingUser.email);

  //   await sendVerificationEmail(existingUser.email, verificationToken.token);

  //   return {success: "Please check your email for verification link  " + email}
  // }

  if (!existingUser.emailVerified) {
    const verificationToken = await getVerificationTokenByEmail(existingUser.email);

    if (!verificationToken?.token) {
        return { error: "Verification token is missing or invalid. Please try again." };
    }

    await sendVerificationEmail(existingUser.email, verificationToken.token);

    return { success: "Please check your email for a verification link sent to: " + email };
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
