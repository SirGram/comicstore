"use client";

import useStore from "@/app/stores/store";
import { useState } from "react";
import { MdClose } from "react-icons/md";

export default function Offer() {
  const { isOfferVisible, setIsOfferVisible } = useStore();
  const freeShippingLimit = 10;

  const handleClose = () => {
    setIsOfferVisible(false);
  };

  if (!isOfferVisible) return null;

  return (
    <div className="w-full overflow-hidden flex justify-between items-center bg-secondary py-4 text-center  border-b-2 border-border -z-10">
      <h3 className="flex-1 text-center">Free shipping on orders above ${freeShippingLimit}</h3>
      <button
        onClick={handleClose}
        className=" right-4 top-0 h-full  text-2xl items-center justify-center flex mr-2"
      >
        <MdClose />
      </button>
    </div>
  );
}
