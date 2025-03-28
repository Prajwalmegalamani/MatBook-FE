import GradientOverlayForBG from "@/components/Overlays/gradient-overlay-for-bg";
import bgLogin from "../../public/images/backgrounds/bg-login.png";
import React from "react";

export default function LoginBackground() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgLogin.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen flex justify-center items-center bg-cover bg-center h-screen fixed top-0 left-0 z-0"
    >
      <GradientOverlayForBG />
    </div>
  );
}
