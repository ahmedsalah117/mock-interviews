import { Button } from "@/components/ui/button";
import { isAuthenticated, signOutHandler } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const RoolLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await isAuthenticated();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
        {user && (
          <div>
            <Button
              className="flex cursor-pointer items-center gap-2 blue-gradient-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded transition-all duration-200 shadow focus:outline-none focus:ring-2 focus:ring-[#171532] focus:ring-offset-2"
              onClick={signOutHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 opacity-80"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 12H9m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Log out
            </Button>
          </div>
        )}
      </nav>
      {children}
    </div>
  );
};

export default RoolLayout;
