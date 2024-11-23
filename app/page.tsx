import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroSection } from "./pages/hero-section";
import { PricingComponent } from "./pages/pricing";

export default function Home() {
  return (
    <main className=" w-full flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_#1b2735_30%,_transparent_60%),_conic-gradient(from_135deg,_#8fd3f4_0%,_#6b8df8_50%,_#4a74e0_100%)] bg-cover bg-center">
      <HeroSection />
      <PricingComponent />
    </main>
  );
}
