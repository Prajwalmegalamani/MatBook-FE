import React from "react";
import Pin_Active_Icon from "../../../public/images/icons/pin-active.svg";
import Pin_Inactive_Icon from "../../../public/images/icons/pin-inactive.svg";
import Image from "next/image";

export default function PinButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="w-fit h-fit">
      {active ? (
        <Image src={Pin_Active_Icon} alt="Pin Active Icon" />
      ) : (
        <Image src={Pin_Inactive_Icon} alt="Pin Inactive Icon" />
      )}
    </button>
  );
}
