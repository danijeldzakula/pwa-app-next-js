import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    cart: [];
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    } as CartState,
    reducers: {

    }
});

export const notesActions = cartSlice.actions;
export default cartSlice;