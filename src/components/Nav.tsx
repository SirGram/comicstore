"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import NavButton from "./reusable/navButton";
import logo from "/public/assets/logo.png";
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
      setIsAtTop(currentScrollPos === 0);
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
    sticky top-0 left-0 right-0 z-30 w-full
    bg-white border-b-2 border-border dark:border-darkBorder
    transition-transform duration-300 ease-in-out
    ${!visible ? '-translate-y-full' : 'translate-y-0'}
  `}
>
  <div className="w-full flex justify-between items-center px-10 transition-all duration-300 ease-in-out"
       style={{height: isAtTop ? '160px' : '60px'}}>
        <div className="flex items-center flex-col">
          <Link href="/">
            <Image
              className={`transition-all w-auto ${
                isAtTop ? "h-20" : "h-10"
              } hover:scale-105`}
              src={logo}
              alt="logo"
            />
          </Link>
          {isAtTop && <span className="my-2">Your closest store</span>}
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
                  } ${!isAtTop ? "rounded-none border-r-0" : "mr-4"}`}
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
              <AiOutlineHeart className="text-2xl" />
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
                <AiOutlineShoppingCart className="text-2xl" />
               
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
