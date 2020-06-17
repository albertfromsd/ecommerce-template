import React from 'react';

// [ STYLING ]
import './CartItem.styles.scss';


const CartItem = ( { item: { name, price, quantity, imageUrl } } ) => {

    return (
        <div className='cart-item'>
            <img src={imageUrl} alt={name} />
            <div className='item-details'>
                <span className='name'> { name } </span>
                <span className='price'> { quantity} × ${ price } </span>
            </div>
        </div>
    );
};

export default React.memo( CartItem );
