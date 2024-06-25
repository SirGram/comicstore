"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import NavButton from "./reusable/navButton";
import logo from "/public/assets/logo.png";

export default function Nav() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();
  const numberCartItems = 0; // Replace with actual cart item count

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      setIsAtTop(currentScrollPos === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const toggleCart = () => {
    console.log("toggleCart");
  };

  const toggleWishList = () => {
    console.log("toggleWishList");
  };

  return (
    <nav
      className={`
        fixed top-0 z-10 w-full  flex justify-between items-center
        bg-white border-b-2 border-border dark:border-darkBorder shadow transition-all duration-500
        ${isAtTop ? "py-6" : "py-3"}
        px-10
      `}
    >
      <div className="flex items-center flex-col">
        <Link href="/">
          <Image
            className={`transition-all w-auto ${
              isAtTop ? "h-16" : "h-10"
            } hover:scale-105`}
            src={logo}
            alt="logo"
            width={200}
            height={isAtTop ? 64 : 40}
          />
        </Link>
        {isAtTop && <span className="mt-2">Your closest store</span>}
      </div>

      <div className="flex gap-6 items-center">
        {["STORE", "HOME"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className={pathname.includes(`/${item.toLowerCase()}`) ? "pointer-events-none bg-mainAccent" : ""}
          >
            <NavButton
              className={`hover:opacity-50 transition-opacity ${
                pathname.includes(`/${item.toLowerCase()}`)
                  ? "border-black pointer-events-none"
                  : "border-white"
              }`}
            >
              {item}
            </NavButton>
          </Link>
        ))}
        <NavButton onClick={toggleWishList} className="hover:opacity-50 transition-opacity">
          <AiOutlineHeart className="text-2xl" />
        </NavButton>
        <NavButton onClick={toggleCart} className="hover:opacity-50 transition-opacity">
          <div className="relative">
            <AiOutlineShoppingCart className="text-2xl" />
            {numberCartItems > 0 && (
              <span className="absolute -top-2 -right-2 text-xs h-5 w-5 flex items-center justify-center rounded-full bg-red-700 text-white">
                {numberCartItems}
              </span>
            )}
          </div>
        </NavButton>
      </div>
    </nav>
  );
}