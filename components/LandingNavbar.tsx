"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-4 sm:px-10 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-md">
      <Link href="/" className="flex items-center gap-3">
        <div className="h-10 w-10 relative">
          <Image
            src="/logo.png"
            alt="Brainee Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        <span className={cn("text-xl sm:text-2xl font-extrabold text-[#2563eb]", font.className)}>
          Brainee
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/sign-up">
          <Button
            variant="outline"
            className="rounded-full border-[#2563eb] text-[#2563eb] hover:bg-[#4169e1] text-sm sm:text-base px-5 py-2 font-medium transition"
          >
            Log in
          </Button>
        </Link>

        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button className="bg-[#4169e1] hover:bg-white hover:text-[#2563EB] border border-[#2563EB] text-white rounded-full px-5 py-2 text-sm sm:text-base font-semibold flex items-center gap-2 transition duration-300 shadow-md">
            Get Started
            {/* <ArrowRight size={18} /> */}
          </Button>
        </Link>
      </div>
    </nav>
  );
};
