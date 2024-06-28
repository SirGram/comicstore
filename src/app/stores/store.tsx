import IComic, { IComicCart } from "@/types/types";
import { create } from "zustand";

type SeenItemsSlice = {
  seenItems: IComic[];
  setSeenItems: (items: IComic[]) => void;
};

type WishListSlice = {
  wishlist: IComic[];
  toggleItemInWishList: (item: IComic) => void;
  emptyWishlist: () => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (isOpen: boolean) => void;
};

type CartSlice = {
  cart: IComicCart[];
  addToCart: (item: IComicCart) => void;
  addOneQuantityToCart: (item: IComicCart) => void;
  substractOneQuantityToCart: (item: IComicCart) => void;
  removeFromCart: (item: IComicCart) => void;
  emptyCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

type OfferSlice = {
  isOfferVisible: boolean;
  setIsOfferVisible: (isVisible: boolean) => void;
};

type StoreState = SeenItemsSlice & WishListSlice & CartSlice & OfferSlice;

const useStore = create<StoreState>((set) => ({
  // SeenItemsSlice
  seenItems: [],
  setSeenItems: (items: IComic[]) => {
    set({ seenItems: items });
  },

  // WishListSlice
  wishlist: [],
  toggleItemInWishList: (item: IComic) => {
    set((state) => ({
      wishlist: state.wishlist.some((wishItem) => wishItem.id === item.id)
        ? state.wishlist.filter((wishItem) => wishItem.id !== item.id)
        : [...state.wishlist, item],
    }));
  },
  emptyWishlist: () => {
    set({ wishlist: [] });
  },
  isWishlistOpen: false,
  setIsWishlistOpen: (isOpen: boolean) => {
    set({ isWishlistOpen: isOpen });
  },

  // CartSlice
  cart: [],
  addToCart: (item: IComicCart) => {
    set((state) => ({ cart: [...state.cart, item] }));
  },
  removeFromCart: (item: IComicCart) => {
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== item.id),
    }));
  },
  emptyCart: () => {
    set({ cart: [] });
  },
  isCartOpen: false,
  setIsCartOpen: (isOpen: boolean) => {
    set({ isCartOpen: isOpen });
  },
  addOneQuantityToCart: (item: IComicCart) => {
    set((state) => {
      const existingCartItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (!existingCartItem) return state;

      const updatedCart = state.cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      return { cart: updatedCart };
    });
  },
  substractOneQuantityToCart: (item: IComicCart) => {
    set((state) => {
      const existingCartItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (!existingCartItem) return state;

      const updatedCart = state.cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      return { cart: updatedCart };
    });
  },

  // OfferSlice
  isOfferVisible: true,
  setIsOfferVisible: (isVisible: boolean) => {
    set({ isOfferVisible: isVisible });
  },
}));

export default useStore;
