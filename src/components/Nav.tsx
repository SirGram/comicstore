"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import NavButton from "./reusable/navButton";
import logo from "/public/assets/logo.png";
import logoletters from "/public/assets/logoletters.png";
import useStore from "@/app/stores/store";
import Button from "./reusable/button";
import Offer from "./Offer";

export default function Nav() {
  const { isCartOpen, setIsCartOpen, cart } = useStore();
  const numberCartItems = cart.length;

  const router = useRouter();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setPrevScrollPos(currentScrollPos);
      setIsAtTop(currentScrollPos < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleWishList = () => {
    router.push("/wishlist");
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-30 w-full
        transition-all duration-300 ease-in-out
        ${isAtTop ? "h-48 md:h-40" : "md:h-24 h-16"}
      `}
    >
      <div
        className={`
          w-full h-full flex flex-col md:flex-row justify-between items-center px-2 sm:px-10 
          transition-all duration-300 ease-in-out          
        bg-overlay border-b-2 border-border dark:border-darkBorder
        `}
      >
        <div className={`flex flex-col  items-center border-b-2 border-border md:border-none w-full 
         ${isAtTop ? "" : "hidden md:flex"}`}>
          <Link href="/" className="flex items-center h-full flex-col md:flex-row">
            <div
              className={`relative ${
                isAtTop ? "h-20 w-20 md:h-28 md:w-28" : "h-14 w-14"
              } transition-all duration-300`}
            >
              <Image
                className="transition-all hover:scale-105 object-contain"
                src={logo}
                alt="logo"
                fill
              />
            </div>
            <div
              className={`
                hidden md:flex
                relative ml-2 ${
                isAtTop ? "h-20 w-32 -my-8 md:h-32 md:w-96" : "h-20 w-48"
              } transition-all duration-300`}
            >
              <Image
                className="transition-all hover:scale-105 object-contain "
                src={logoletters}
                alt="logo"
                fill
              />
            </div>
          </Link>
          {isAtTop && <span className="md:-mt-4 text-center ">Your closest store</span>}
        </div>

        <div className="flex gap-0 items-center h-full flex-1 justify-end">
          <div className="flex">
            {["STORE", "HOME"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}>
                <NavButton
                  className={`h-full 
                  ${
                    pathname.includes(`/${item.toLowerCase()}`)
                      ? "pointer-events-none bg-mainAccent"
                      : ""
                  } hover:opacity-50 transition-opacity ${
                    pathname.includes(`/${item.toLowerCase()}`)
                      ? "border-black pointer-events-none"
                      : "border-white"
                  } ${!isAtTop ? "rounded-none border-r-0" : "sm:mr-4"}`}
                >
                  {item}
                </NavButton>
              </Link>
            ))}
            <NavButton
              onClick={toggleWishList}
              className={`hover:opacity-50 transition-opacity ${
                !isAtTop ? "rounded-none" : ""
              }
                ${
                  pathname.includes("/wishlist")
                    ? "pointer-events-none bg-mainAccent"
                    : ""
                } 
              }`}
            >
              <AiOutlineHeart
                className={`${
                  isAtTop ? "text-3xl" : "text-xl"
                } transition-all duration-300`}
              />
            </NavButton>
          </div>
          <div className="border-l-2 border-border h-full px-4 ml-4 flex items-center justify-center">
            <Button
              onClick={toggleCart}
              className={`hover:opacity-50 transition-opacity border-l-2 border-border ${
                !isAtTop ? "rounded-none" : ""
              }`}
            >
              <div className="relative">
                <AiOutlineShoppingCart
                  className={`${
                    isAtTop ? "text-3xl" : "text-xl"
                  } transition-all duration-300`}
                />

                <span className="absolute -top-3 -right-3 text-xs h-5 w-5 flex items-center justify-center rounded-full border-2 border-border text-white bg-mainAccent">
                  {numberCartItems}
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Offer />
    </nav>
  );
}
