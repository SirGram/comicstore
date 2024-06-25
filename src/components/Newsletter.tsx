"use client";

import Image from "next/image";
import { useState } from "react";
import newsletter from "/public/assets/newsletter.jpg";

export default function Newsletter() {
    const [email, setEmail] = useState('');

    const signUpForNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log("Submitted email:", email);
    };

  return (
    <div className="relative flex items-center justify-center h-80 w-full">
      <Image
        src={newsletter}
        alt="Newsletter background"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
      />
      <div className="relative z-10 flex flex-col items-center justify-around p-8 w-full shadow-lg h-full backdrop-hue-rotate-30 backdrop-contrast-50 backdrop-saturate-50">
        <h1 className="font-bold mb-4 text-yellow-300 text-center bg-slate-700 bg-opacity-30 p-2">
          Subscribe to Our Newsletter
        </h1>

        <form
          onSubmit={signUpForNewsletter}
          className="flex w-full max-w-md items-center rounded-md border-2 border-gray-300 dark:border-gray-700 font-base shadow-md"
          role="form"
        >
          <input
            className="w-full bg-white dark:bg-gray-800 rounded-l-md p-3 outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="rounded-r-md border-l-2 text-white border-gray-300 dark:border-gray-700 bg-yellow-500 hover:bg-yellow-600 p-3 px-5"
            type="submit"
            aria-label="Submit Newsletter"
          >
            Subscribe
          </button>
        </form>

        <ul className="flex gap-4 text-white mb-8 text-center text-lg font-semibold bg-slate-700 bg-opacity-30 p-2">
          <li>Latest releases</li>
          <li>|</li>
          <li>Promotions</li>
          <li>|</li>
          <li>Events</li>
        </ul>
      </div>
    </div>
  );
}