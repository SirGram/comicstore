"use client";

import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import IComic, { IComicCart } from "@/types/types";
import CartCard from "./CartCard";
import useStore from "@/app/stores/store";
import Button from "../reusable/button";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    emptyCart,
    isCartOpen,
    setIsCartOpen,
    substractOneQuantityToCart,
    addOneQuantityToCart,
  } = useStore();
  console.log(isCartOpen);

  const shippingPrice = 5; // Define your shipping price
  const freeShippingLimit = 50; // Define your free shipping limit
  const discountPercentage = 10; // Define your discount percentage

  const getSubTotalPrice = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getIsFreeShipping = (): boolean => {
    return subTotalPrice > freeShippingLimit;
  };

  const getDiscountedPrice = (): number => {
    return (discountPercentage * subTotalPrice) / 100;
  };

  const getTotalPrice = (): number => {
    return (
      subTotalPrice + (isFreeShipping ? 0 : shippingPrice) - discountedPrice
    );
  };

  const subTotalPrice: number = getSubTotalPrice();
  const isFreeShipping: boolean = getIsFreeShipping();
  const discountedPrice: number = getDiscountedPrice();
  const totalPrice: number = getTotalPrice();
  const barWidth: number = Math.min(
    (subTotalPrice / freeShippingLimit) * 100,
    100
  );
  const remainingBarPrice: number = Math.max(
    freeShippingLimit - subTotalPrice,
    0
  );

  const getItemDiscountedPrice = (item: IComicCart): number => {
    return (
      item.price * item.quantity -
      (discountPercentage / 100) * (item.price * item.quantity)
    );
  };

  const removeCartItem = (item: IComicCart) => {
    removeFromCart(item);
  };
  console.log(barWidth);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } backdrop-blur-sm backdrop-contrast-50`}
      >
        <div
          className={`fixed right-0 top-0 z-10 h-full flex flex-col w-full lg:w-3/5 bg-bg px-8 py-5 transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center bg-mainAccent text-5xl border-border border-b-2 border-r-2 rounded-none hover:opacity-50"
            onClick={() => setIsCartOpen(false)}
          >
            <IoClose />
          </button>
          <div className="flex flex-col h-full">
            {cart.length === 0 ? (
              <h2 className="mb-5 text-center">Cart is empty</h2>
            ) : (
              <>
                <h2 className="mb-5 text-center">
                  {cart.length} {cart.length === 1 ? "item" : "items"} in the
                  cart
                </h2>
                {/* ... (shipping progress bar code) */}
                <div className="flex w-full justify-end mt-2">
                  <Button
                    className=" w-full sm:w-fit text-center hover:opacity-50 mb-4 bg-mainAccent text-darkText"
                    onClick={emptyCart}
                  >
                    Remove All
                  </Button>
                </div>
                <ul className="flex-1 overflow-y-auto">
                  {cart.map((cartItem, index) => (
                    <li key={index} className="mb-3">
                      <CartCard
                        cartItem={cartItem}
                        addOneQuantityToCart={addOneQuantityToCart}
                        substractOneQuantityToCart={substractOneQuantityToCart}
                        removeCartItem={removeCartItem}
                        discountedPrice={getItemDiscountedPrice(cartItem)}
                        discountPercentage={discountPercentage}
                        setIsCartOpen={setIsCartOpen}
                      />
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <div className="flex flex-col comic p-3 bg-tertiary">
                    <div className="flex justify-between">
                      <h4 className="font-light">SubTotal:</h4>
                      <h4 className="text-right font-thin">
                        ${subTotalPrice.toFixed(2)}
                      </h4>
                    </div>
                    <div className="flex justify-between">
                      <h4 className="font-light">Shipping:</h4>
                      <h4
                        className={`text-right font-thin ${
                          isFreeShipping ? "line-through" : ""
                        }`}
                      >
                        ${shippingPrice.toFixed(2)}
                      </h4>
                    </div>
                    <div className="flex justify-between">
                      <h4 className="font-light">Discount:</h4>
                      <h4 className="text-right font-thin">
                        -${discountedPrice.toFixed(2)}
                      </h4>
                    </div>
                    <div className="mt-1 flex justify-between">
                      <h3>Total:</h3>
                      <h3 className="text-right">${totalPrice.toFixed(2)}</h3>
                    </div>
                  </div>
                  <Button
                    className="mt-5 w-full bg-mainAccent comic py-2 text-white transition-opacity hover:opacity-50"
                    onClick={() =>
                      window.alert(
                        `You bought ${
                          cart.length
                        } item/s for $${totalPrice.toFixed(2)}!`
                      )
                    }
                  >
                    <h3 className="text-center w-full">Checkout</h3>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
