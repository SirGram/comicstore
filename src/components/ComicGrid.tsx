"use client";

import { useRouter } from "next/navigation";
import CardImage from "./reusable/cardImage";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import useStore from "@/app/stores/store";

export default function ComicGrid({ items }: { items: any[] }) {
  const router = useRouter();
  const { wishlist, toggleItemInWishList } = useStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {items.map((item) => {
        const isItemInWishList = wishlist.some(
          (wishItem) => wishItem.id === item.id
        );
        const hasImages = item.images.length > 0;
        const imageUrl = hasImages
          ? `${item.images[0].path}.${item.images[0].extension}`
          : "/path/to/default/image.jpg";

        return (
          <div
            key={item.id}
            className="comic relative group  h-80 w-56"
           
          >
            <CardImage path={imageUrl} title={item?.title} showShadow={false} />
            <button className="absolute inset-x-0 top-0 h-48 cursor-pointer"  onClick={() => router.push(`/store/${item.id}`)}>

            </button>
            <div className="absolute -inset-x-1  -bottom-1 h-32 bg-black  text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
              <button className="w-full cursor-pointer bg-mainAccent flex justify-center items-center  text-2xl p-3 border-t-2 border-border" onClick={() => toggleItemInWishList(item)}>
                {!isItemInWishList ? <FaHeart /> : <FaHeartBroken />}
              </button>
              <div className="p-3 ">
                <h6 className="font-bold truncate">{item.title}</h6>
                <h3>${item.price}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
