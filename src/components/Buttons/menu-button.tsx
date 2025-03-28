import React from "react";
import Menu_Active_Icon from "../../../public/images/icons/menu-active.svg";
import Menu_Inactive_Icon from "../../../public/images/icons/menu-inactive.svg";
import Image from "next/image";

export default function MenuButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick}>
      {active ? (
        <Image src={Menu_Active_Icon} alt="Menu Active Icon" />
      ) : (
        <Image src={Menu_Inactive_Icon} alt="Menu Inactive Icon" />
      )}
    </button>
  );
}
