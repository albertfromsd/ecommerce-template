import { cartActionTypes } from './cart.types';

export const addItem = item => ({
    type: cartActionTypes.ADD_ITEM,
    data: item
});

export const incItem = item => ({
    type: cartActionTypes.INC_ITEM,
    data: item
});

export const decItem = item => ({
    type: cartActionTypes.DEC_ITEM,
    data: item
});

export const clearItem = item => ({
    type: cartActionTypes.CLEAR_ITEM,
    data: item
});

export const toggleCartDropDown = () => ({
    type: cartActionTypes.TOGGLE_CART_DROPDOWN
});

export const clearCart = () => ({
    type: cartActionTypes.CLEAR_CART,
});