"use client"

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const LoginButton = ({ children, mode = "modal", asChild = false }: LoginButtonProps) => {
    const router = useRouter()
    const onclick = () => {
       router.push("/auth/login")  
    }

    // if (mode === "modal") {
    //     return (
    //         <span>TODO: Implement modal login button</span>
    //     )
    // }

  return (
    <span onClick={onclick} className="cursor-pointer">{children}</span>
  )
}

