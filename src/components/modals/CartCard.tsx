"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IComicCart } from "@/types/types";
import CardImage from "@/components/reusable/cardImage";
import { useRouter } from "next/navigation";

export default function CartCard({
  cartItem,
  addOneQuantityToCart,
  substractOneQuantityToCart,
  removeCartItem,
  discountedPrice,
  discountPercentage,
  setIsCartOpen,
}: {
  cartItem: IComicCart;
  addOneQuantityToCart: (item: IComicCart) => void;
  substractOneQuantityToCart: (item: IComicCart) => void;
  removeCartItem: (item: IComicCart) => void;
  discountedPrice: number;
  discountPercentage: number;
  setIsCartOpen: (isCartOpen: boolean) => void;
}) {
  const subtractQuantity = (): void => {
    if (cartItem.quantity > 1) {
      substractOneQuantityToCart(cartItem);
    }
  };

  const addQuantity = (): void => {
    if (cartItem.quantity < 99) {
      addOneQuantityToCart(cartItem);
    }
  };

  const originalPrice = cartItem.price * cartItem.quantity;
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row w-full sm:h-44 comic bg-secondary">
      <button 
        className="w-full sm:w-auto h-40 sm:h-auto sm:aspect-[2/3] shrink-0" 
        onClick={() => {router.push(`/store/${cartItem.id}`); setIsCartOpen(false)}}
      >
        <CardImage
          path={`${cartItem.images[0]?.path}.${cartItem.images[0]?.extension}`}
          title={cartItem.title}
          height="full"
          showShadow
        />
      </button>
      <div className="flex flex-1 flex-col w-full p-2 sm:px-5 sm:py-2">
        <div className="flex flex-col w-full">
          <h4 className="mb-2 h-auto sm:h-10 truncate pr-6">{cartItem.title}</h4>
          <div className="flex justify-between items-center">
            <span className="text-base sm:text-lg line-through text-gray-500">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="text-base sm:text-lg font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-accent border-2 w-fit border-main p-1">
            {discountPercentage}% off
          </span>
        </div>
        <div className="flex items-center w-full justify-between mt-2">
          <div className="flex h-8 justify-start comic">
            <button
              onClick={subtractQuantity}
              className="flex w-8 items-center justify-center border-r-2 border-border bg-secondary p-1 text-base sm:text-xl transition-opacity hover:opacity-50"
            >
              <FaMinus />
            </button>
            <h4 className="w-10 text-center">{cartItem.quantity}</h4>
            <button
              onClick={addQuantity}
              className="flex w-8 items-center justify-center border-l-2 border-border bg-secondary p-1 text-base sm:text-xl transition-opacity hover:opacity-50"
            >
              <FaPlus />
            </button>
          </div>
          <button
            onClick={() => removeCartItem(cartItem)}
            className="text-xl sm:text-2xl text-text transition-opacity hover:opacity-50 rounded-base border-2 border-border p-1 bg-mainAccent"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}