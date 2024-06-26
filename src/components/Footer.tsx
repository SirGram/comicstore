"use client";
import { AiFillGithub } from "react-icons/ai";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-between items-center  w-full pb-20 mt-6  relative  ">
      <div className="bg-bg absolute w-full top-4 bottom-0 -z-10 border-border border-t-2"></div>
      <div className="flex flex-col sm:flex-row gap-2 justify-around w-full  ">
        <div className=" flex flex-1 flex-col items-center justify-center h-full   mx-20 ">
          <div className="w-min flex flex-col h-fit comic gap-7 px-2 py-4 ">
            <FaTwitter className="text-gray-400 text-5xl cursor-pointer" />
            <FaInstagram className="text-gray-400 text-5xl cursor-pointer" />
            <FaFacebook className="text-gray-400 text-5xl cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-around sm:w-fit w-full comic bg-white p-5  gap-10 rounded-tr-none border-r-none rounded-br-none">
          <div>
            <p className="mb-1">Customer Service</p>
            <ul>
              <li>
                <a
                  href="/customer-service/in-store-pickup"
                  className="text-gray-400"
                >
                  In-Store Pick-up
                </a>
              </li>
              <li>
                <a href="/customer-service/sitemap" className="text-gray-400">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="/customer-service/faq" className="text-gray-400">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/customer-service/privacy-policy"
                  className="text-gray-400"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/customer-service/unsubscribe-newsletter"
                  className="text-gray-400"
                >
                  Unsubscribe Newsletter
                </a>
              </li>
              <li>
                <a
                  href="/customer-service/terms-conditions"
                  className="text-gray-400"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/customer-service/shipping-information"
                  className="text-gray-400"
                >
                  Shipping Information
                </a>
              </li>
              <li>
                <a
                  href="/customer-service/accessibility-information"
                  className="text-gray-400"
                >
                  Accessibility Information
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-1">My Account</p>
            <ul>
              <li>
                <a href="/account/order-status" className="text-gray-400">
                  Order Status
                </a>
              </li>
              <li>
                <a href="/account/settings" className="text-gray-400">
                  Account Settings
                </a>
              </li>
              <li>
                <a
                  href="/account/subscription-settings"
                  className="text-gray-400"
                >
                  Subscription Settings
                </a>
              </li>
              <li>
                <a href="/account/gift-card-balance" className="text-gray-400">
                  Check Gift Card Balance
                </a>
              </li>
              <li>
                <a href="/account/faq" className="text-gray-400">
                  Pull List FAQ
                </a>
              </li>
              <li>
                <a href="/account/pre-orders" className="text-gray-400">
                  Pre-Orders
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-row  items-center relative w-full pt-10 justify-around gap-2 px-2 ">
        <div className="flex flex-col text-left gap-2">
          <span>&copy;PRINCESTON COMICS</span>
          <span>2024 | All rights reserved</span>
        </div>
        <div className="text-right gap-2">
          <a
            href="https://github.com/SirGram"
            target="_blank"
            className="inline-flex items-center w-full justify-end "
          >
            <AiFillGithub className="text-2xl mr-1" />
            <span className="ml-1">SirGram</span>
          </a>{" "}
          <p>Project made using Marvel API</p>
        </div>
      </div>
    </footer>
  );
}
