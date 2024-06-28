import Image from "next/image";
import spiderman from "/public/assets/spiderman.png";
export default function NotFound() {
  return (
    <div className="flex-1 flex h-full items-center justify-center -mb-10">
      <div className="flex-1 flex  pt-10 pr-10 justify-center ">
        <Image src={spiderman} alt="spiderman" />
        <div className=" h-full comic bg-mainAccent p-3">
          <h1 className=" text-center text-8xl mb-10">Oooops!</h1>
          <h2 className=" text-center text-2xl">
            Looks like this page doesn't exist
          </h2>
        </div>
      </div>
    </div>
  );
}
