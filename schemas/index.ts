import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(1,{
        message: "Please enter a password"
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    name: z.string().min(1,{
        message: "Please enter your name"
    }),
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6,{
        message: "Please enter a password with at least 6 characters"
    }),
})

export const ResetPasswordSchema = z.object({
    email: z.string().email({
        message: "Please enter the email address you used to register"
    }),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message: "Please enter a new password with at least 6 characters"
    })
});