
export const cartItemCount = items => {
    if( !items.length ) return 0;

    return ( items.reduce( (acc, current ) =>
        acc + current.quantity, 0 ) );
};