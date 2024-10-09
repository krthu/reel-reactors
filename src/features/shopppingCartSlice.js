import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const shoppingCartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItem: (state, action) => {
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };
        },
        removeItem: (state, action) => {

            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
            };
        },

    },

});

export const { addItem, removeItem } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
