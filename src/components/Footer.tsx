"use client";
import { AiFillGithub } from "react-icons/ai";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-between items-center relative w-full mb-20 mt-6  bg-white ">
      <div className="flex flex-row justify-around w-full bg-slate-100 p-5">
      <div className=" flex flex-col items-center justify-center gap-7 ">
      <FaTwitter className="text-gray-400 text-5xl" />
            <FaInstagram className="text-gray-400 text-5xl" />
            <FaFacebook className="text-gray-400 text-5xl" />
        
        </div>
      <div >
        <p className="mb-1">Customer Service</p>
        <ul>
          <li><a href="/customer-service/in-store-pickup" className="text-gray-400">In-Store Pick-up</a></li>
          <li><a href="/customer-service/sitemap" className="text-gray-400">Sitemap</a></li>
          <li><a href="/customer-service/faq" className="text-gray-400">FAQ</a></li>
          <li><a href="/customer-service/privacy-policy" className="text-gray-400">Privacy Policy</a></li>
          <li><a href="/customer-service/unsubscribe-newsletter" className="text-gray-400">Unsubscribe Newsletter</a></li>
          <li><a href="/customer-service/terms-conditions" className="text-gray-400">Terms & Conditions</a></li>
          <li><a href="/customer-service/shipping-information" className="text-gray-400">Shipping Information</a></li>
          <li><a href="/customer-service/accessibility-information" className="text-gray-400">Accessibility Information</a></li>
        </ul></div>
        
         <div >
        <p className="mb-1">My Account</p>
        <ul>
          <li><a href="/account/order-status" className="text-gray-400">Order Status</a></li>
          <li><a href="/account/settings" className="text-gray-400">Account Settings</a></li>
          <li><a href="/account/subscription-settings" className="text-gray-400">Subscription Settings</a></li>
          <li><a href="/account/gift-card-balance" className="text-gray-400">Check Gift Card Balance</a></li>
          <li><a href="/account/faq" className="text-gray-400">Pull List FAQ</a></li>
          <li><a href="/account/pre-orders" className="text-gray-400">Pre-Orders</a></li>
        </ul></div>  
        
       
        </div>
     
      <div className="flex flex-row justify-between items-center relative w-full p-5 pt-10">
        <div className="flex flex-col">
          <span>&copy;PRINCESTON COMICS</span>
          <span>2024 | All rights reserved</span>
          
        </div><div>
        <a
          href="https://github.com/SirGram"
          target="_blank"
          className="inline-flex items-center w-full justify-end"
        >
          <AiFillGithub className="text-2xl" />
          <span className="ml-1">SirGram</span>
         
        </a> <p>Project made using Marvel API</p>
      </div></div>
    </footer>
  );
}
