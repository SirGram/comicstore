"use client";
import useStore from "@/app/stores/store";
import IComic, { IComicCart } from "@/types/types";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useMemo } from 'react';
import Button from "../reusable/button";

export default function BuyItem({
  seriesItems,
  item,
}: {
  seriesItems?: IComic[];
  item: IComic;
}) {
  const { addToCart, removeFromCart, toggleItemInWishList, wishlist, cart } =
    useStore();

  const quantity: number = 1;
  const discountPercentage: number = 10;

  const seriesPrice = useMemo(() => {
    return seriesItems
      ? parseFloat(
          seriesItems
            .reduce((total, item) => total + Number(item.price), 0)
            .toFixed(2)
        )
      : 0;
  }, [seriesItems]);

  const discountedPrice = (price: number) =>
    (price - (price * discountPercentage) / 100).toFixed(2);

  const isItemInWishList = (): boolean => {
    return wishlist.some((wishItem) => wishItem.id === item?.id);
  };

  const isItemInCart = (): boolean => {
    return cart.some((cartItem) => cartItem.id === item?.id);
  };

  const addItemToCart = () => {
    const cartItem: IComicCart = { ...item, quantity };
    addToCart(cartItem);
  };

  const addSeriesToCart = () => {
    seriesItems?.forEach((seriesItem) => {
      const cartItem: IComicCart = { ...seriesItem, quantity };
      addToCart(cartItem);
    });
  };

  const areSeriesItemsInCart = (): boolean => {
    return seriesItems
      ? seriesItems.every((seriesItem) =>
          cart.some((cartItem) => cartItem.id === seriesItem.id)
        )
      : false;
  };

  return (
    <article className="comic flex w-96 h-[28rem] flex-col justify-between bg-secondary  ">
      <div className="flex flex-col justify-between border-b-2 border-border p-5">
        <h3 className="mb-4">Item</h3>
        <div className="flex h-full flex-col justify-around text-center">
          <div className="flex items-center justify-around">
            <h5 className="line-through">${item?.price}</h5>
            <h5 className="w-max border-2 border-red-500 px-1 text-red-500">
              {discountPercentage}% OFF
            </h5>
          </div>
          <h2 className="mt-2 font-semibold">
            ${item && discountedPrice(Number(item.price))}
          </h2>
        </div>
        <div className="mt-3 flex h-full gap-2">
          <Button
            className="flex items-center  px-3 text-text text-xl hover:opacity-50"
            onClick={() => toggleItemInWishList(item)}
          >
            {isItemInWishList() ? <FaHeartBroken /> : <FaHeart />}
          </Button>
          <Button
            className={`w-full  bg-mainAccent px-2 py-1  font-semibold text-white transition-opacity hover:opacity-50 ${
              isItemInCart() ? "pointer-events-none" : ""
            }`}
            onClick={addItemToCart}
          >
           <h3 className="w-full ">{isItemInCart() ? "Added to cart!" : "Add to cart"}</h3>
          </Button>
        </div>
      </div>
      {seriesItems && seriesItems.length > 0 && (
        <div className="flex flex-col justify-between p-5 pt-0">
          <h3 className="mb-4">Series</h3>
          <div className="flex h-full flex-col justify-around text-center">
            <div className="flex items-center justify-around">
              <h5 className="line-through">${seriesPrice}</h5>
              <h5 className="w-max border-2 border-red-500 px-1 text-red-500">
                {discountPercentage}% OFF
              </h5>
            </div>
            <h2 className="mt-2 font-semibold">${discountedPrice(seriesPrice)}</h2>
          </div>
          <div className="mt-3 flex h-full gap-2">
            <Button
              className="flex items-center  px-3 text-text text-xl hover:opacity-50"
              onClick={() => seriesItems.forEach(toggleItemInWishList)}
            >
              {seriesItems.every((seriesItem) => wishlist.some((wishItem) => wishItem.id === seriesItem.id)) ? (
                <FaHeartBroken />
              ) : (
                <FaHeart />
              )}
            </Button>
            <Button
              className={`w-full  bg-mainAccent px-2 py-1 font-semibold  text-white transition-opacity hover:opacity-50 ${
                areSeriesItemsInCart() ? "pointer-events-none" : ""
              }`}
              onClick={addSeriesToCart}
            >
                <h3 className="w-full ">{areSeriesItemsInCart() ? "Added to cart!" : "Add to cart"}</h3>
             
            </Button>
          </div>
        </div>
      )}
    </article>
  );
}