"use client";

import useStore from "@/app/stores/store";


export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isOfferVisible } = useStore();

  return (
    <main className={`flex-1 flex flex-col justify-center items-center ${isOfferVisible ? 'mt-[17rem] sm:mt-[14rem]' : 'mt-[13rem] sm:mt-[10rem]'} transition-all duration-300`}>
      {children}
    </main>
  );
}