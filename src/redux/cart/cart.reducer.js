import { cartActionTypes } from './cart.types';
import { addItemToCart, clearItemInCart, decItemInCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = ( state=INITIAL_STATE, action ) => {
    switch( action.type ) {
        case cartActionTypes.TOGGLE_CART_DROPDOWN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case cartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart( state.cartItems, action.data )
            };
        case cartActionTypes.DEC_ITEM:
            return {
                ...state,
                cartItems: decItemInCart( state.cartItems, action.data )
            }
        case cartActionTypes.CLEAR_ITEM:
            return {
                ...state,
                cartItems: clearItemInCart( state.cartItems, action.data )
            }
        case cartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    };
};

export default cartReducer;