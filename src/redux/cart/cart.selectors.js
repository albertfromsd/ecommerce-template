import { createSelector } from 'reselect';

// selector memoizes the returned value of selectCartItems
const selectCart = state => state.cart;

export const selectCartItems = createSelector( 
    [ selectCart ], 
    ( cart ) => cart.cartItems 
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    items =>  items.reduce(
        (accQuantity, item) =>
            accQuantity + item.quantity, 0 )
);

export const selectCartTotal = createSelector(
    [ selectCartItems ],
    ( items ) => items.reduce( 
        ( accPrice, item ) =>
        accPrice + ( item.price * item.quantity ),
        0
    )
);

// Cart Visibility
export const selectIsCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);