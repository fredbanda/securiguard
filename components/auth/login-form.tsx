"use client";

import { useState, useRef } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with your other account"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const codeInputs = useRef<HTMLInputElement[]>([]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "", // Will be constructed dynamically
    },
  });

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...(form.getValues("code") || "").split("")];
    newCode[index] = value;
    form.setValue("code", newCode.join(""));

    // Focus on the next input if a value is entered
    if (value && index < 5) {
      codeInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Backspace" &&
      index > 0 &&
      !(event.currentTarget as HTMLInputElement).value
    ) {
      codeInputs.current[index - 1]?.focus();
    }
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    // Perform login logic here
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went horribly wrong"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back to Invisiguard"
      backButtonLabel="Don't have an account yet? Sign up"
      backButtonHref="/auth/register"
      showSocialButton
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            {showTwoFactor ? (
              <>
                <FormLabel>Two-Factor Code</FormLabel>
                <div className="flex gap-2">
                  {[...Array(6)].map((_, index) => (
                    <Input
                      key={index}
                      ref={(el) => {
                        if (el) {
                          codeInputs.current[index] = el; // Populate codeInputs array
                        }
                      }}
                      maxLength={1}
                      type="text"
                      inputMode="numeric"
                      className="w-12 text-center"
                      onChange={(e) =>
                        handleCodeChange(index, e.currentTarget.value)
                      } // Safe value access
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={isPending}
                    />
                  ))}
                </div>
                <FormMessage />
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your email here"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 text-[14px] font-normal"
                      >
                        <Link href="/auth/password-reset">
                          Forgot Password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full"
            variant="custom"
            disabled={isPending}
          >
            {showTwoFactor ? "Verify Code" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
