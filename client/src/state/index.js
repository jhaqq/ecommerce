import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isCartOpen: false,
    isSearchOpen: false,
    showAuth: false,
    cart: [],
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },

        addToCart: (state, action) => {
            state.cart = [ ...state.cart, action.payload.item ];
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id)
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if(item.id === action.payload.id) item.count++;
                return item;
            });
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if(item.id === action.payload.id && item.count > 1) item.count--;
                return item;
            });
        },


        setIsCartOpen: (state) => { state.isCartOpen = !state.isCartOpen; },
        
        setIsSearchOpen: (state) => { state.isSearchOpen = !state.isSearchOpen; },

        setShowAuth: (state, action) => { state.showAuth = action.payload; }
    }
});

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
    setIsSearchOpen,
    setShowAuth
} = cartSlice.actions;

export default cartSlice.reducer;