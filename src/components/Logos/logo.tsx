import React from "react";
import Logo_Image_With_Text from "../../../public/images/logos/logo-with-text.svg";
import Logo_Image_Without_Text from "../../../public/images/logos/logo-without-text.svg";
import Image from "next/image";

export default function Logo({ withText = true }: { withText: boolean }) {
  return (
    <Image
      src={withText ? Logo_Image_With_Text : Logo_Image_Without_Text}
      alt="logo"
    />
  );
}
