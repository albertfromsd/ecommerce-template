// grouping items together if same item added multiple times
export const addItemToCart = ( items, newItem ) => {
    const existingItem = items.find( item => item.id === newItem.id );

    if( existingItem ) {
        return items.map( item =>
            item.id === newItem.id 
                ? { ...item, quantity: item.quantity += 1 }
                : item
            );
    };

    return [ ...items, { ...newItem, quantity: 1} ];
};

export const decItemInCart = ( items, newItem ) => {
    const existingItem = items.find( item => item.id === newItem.id );

    if( existingItem.quantity <= 1 ) {
        return items.filter( item => item.id !== newItem.id )
    };
    
    return items.map( item =>
        item.id === newItem.id
            ? { ...item, quantity: item.quantity -= 1 }
            : item
        );
};

export const clearItemInCart = ( items, newItem ) => {
    return items.filter( item => item.id !== newItem.id )
}