import React from "react";

export default function Separators() {
  return (
    <div className="flex w-full justify-center items-center align-middle">
      <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
      <span className="font-poppins text-sm font-bold min-w-[48px] flex justify-center items-center text-[#333333]">
        Or
      </span>
      <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
    </div>
  );
}
