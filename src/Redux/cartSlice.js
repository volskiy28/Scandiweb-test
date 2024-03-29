import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalQty: 0,
};

export const cartSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart: (state, action, product) => {
      product = action.payload;
      const item = state.cart.find((cartItem) => cartItem.id === product.id);
      let newState = {};
      if (item) {
        newState = {
          ...state,
          cart: state.cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  qty: item.qty + 1,
                }
              : item
          ),
          totalQty: state.cart.reduce((acc, item) => {
            return acc + item.qty;
          }, 1),
        };
        return newState;
      }
      newState = {
        ...state,
        cart: [...state.cart, product],
        totalQty: state.cart.reduce((acc, item) => {
          return acc + item.qty;
        }, 1),
      };
      return newState;
    },
    removeFromCart: (state, action, productToRemove) => {
      productToRemove = action.payload;
      const itemToRemove = state.cart.find(
        (product) => product.id === productToRemove.id
      );
      let updatedState = {};
      if (itemToRemove.qty <= 1) {
        updatedState = {
          ...state,
          cart: state.cart.filter((item) => item.id !== productToRemove.id),
          totalQty: state.totalQty - 1,
        };
        return updatedState;
      } else {
        updatedState = {
          ...state,
          cart: state.cart.map((item) =>
            item.id === productToRemove.id
              ? {
                  ...item,
                  qty: item.qty - 1,
                }
              : item
          ),
          totalQty: state.totalQty - 1,
        };

        return updatedState;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cart = (state) => state.shop.cart;
export const totalQty = (state) => state.shop.totalQty;

export default cartSlice.reducer;
