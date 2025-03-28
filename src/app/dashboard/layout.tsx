"use client";
import MenuButton from "@/components/Buttons/menu-button";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <div className="w-full h-full flex justify-start align-middle bg-[#FFFAF2] items-center">
      <div
        className={`w-1/12 h-full flex justify-center py-8 items-start ${
          menuToggle ? "bg-red-500" : "bg-[#FFFAF2]"
        }`}
      >
        <MenuButton
          active={menuToggle}
          onClick={() => setMenuToggle(!menuToggle)}
        />
      </div>
      <div className="w-11/12 h-full py-8 px-2">{children}</div>
    </div>
  );
}
