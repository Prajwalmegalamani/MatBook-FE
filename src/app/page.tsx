"use client";
import bgLogin from "../../public/images/backgrounds/bg-login.png";
import Image from "next/image";
import LogoWithText from "../../public/images/logos/logo-with-text.svg";
import TempImage from "../../public/images/temp.svg";
import Socials from "../../public/images/socials.svg";
import Logo from "@/components/Logos/logo";
import GradientOverlayForBG from "@/components/Overlays/gradient-overlay-for-bg";
import LoginBackground from "@/backgrounds/login-background";
import LoginButton from "@/components/Buttons/login-button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <div>Home</div> : <div>Login</div>}</>;
}
