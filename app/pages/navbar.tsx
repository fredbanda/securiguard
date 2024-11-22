"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";


const NavbarMain = () => {
  //const { data: session } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const onClick = () => {
    //signOut()
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/">
                <Image className="h-8 w-auto" src="/logo.png" alt="InvisiGuard" width={148} height={48} />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href="/dashboard" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                 Dashboard
                </Link>
                <Link href="/dashboard/ref-checks" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                   Ref Checks
                </Link>
                <Link href="/dashboard/fraud-detect" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                 Fraud Detect
                </Link>
                <Link href="/dashboard/reports" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                   My Reports
                </Link>
                <Link href="/dashboard/malware-scan" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                   Check for Malware & Virus
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            
              // User menu dropdown if logged in
              <div className="relative ml-3">
                <button
                  type="button"
                  onClick={toggleUserMenu}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="size-8 rounded-full"
                    //src={session.user.image ?? "/profile-pic.svg"}
                    src="/global.svg"
                    alt="User profile"
                    width={50}
                    height={50}
                  />
                </button>
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <Link href="/dashboard/profile-page" role="menuitem" className="block px-4 py-2 text-sm text-gray-700">
                      Your Profile
                    </Link>
                    <Link href="/dashboard/settings" role="menuitem" className="block px-4 py-2 text-sm text-gray-700" >
                     Settings
                    </Link>
                    <Link href="#" role="menuitem" className="block px-4 py-2 text-sm text-gray-700" onClick={onClick}>
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
         
              // Login link if not logged in
              <>
              <Link href="/auth/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                Login
              </Link>
                          <Link href="/auth/register" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                Register
              </Link>
              </>
       

          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;

