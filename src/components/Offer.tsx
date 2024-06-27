"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";

export default function Offer() {
  const [isVisible, setIsVisible] = useState(true);
  const freeShippingLimit = 10;

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full overflow-hidden bg-secondary py-4 text-center relative border-t-2 border-border -z-10">
      <h3>Free shipping on orders above ${freeShippingLimit}</h3>
      <button
        onClick={handleClose}
        className="absolute  right-4 top-0 h-full  text-2xl items-center justify-center flex"
      >
        <MdClose />
      </button>
    </div>
  );
}
