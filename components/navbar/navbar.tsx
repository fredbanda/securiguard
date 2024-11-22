"use client";


import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="p-20 flex justify-between items-center rounded-xl w-[600px] shadow-sm text-white bg-black">
      <div className="flex gap">
        <Button
          asChild
          variant={pathname === "/server" ? "outline" : "secondary"}
        >
          <Link href="/dashboard/server">server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin" ? "outline" : "secondary"}
        >
          <Link href="/dashboard/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "outline" : "secondary"}
        >
          <Link href="/dashboard/client">client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/dashboard/settings" ? "outline" : "secondary"}
        >
          <Link href="/dashboard/settings">Settings</Link>
        </Button>
      </div>
    </nav>
  );
};
