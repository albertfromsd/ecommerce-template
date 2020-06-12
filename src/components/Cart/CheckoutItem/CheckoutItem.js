import React from 'react';

// [ REDUX ]
import { connect } from 'react-redux';
import { 
    addItem, 
    decItem, 
    clearItem } from '../../../redux/cart/cart.actions';

// [ STYLING ]
import './CheckoutItem.styles.scss';


const CheckoutItem = ({ item, clearItem, addItem, decItem }) => {
    const { name, price, quantity, imageUrl } = item;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'> 
                <div className='arrow' onClick={ () => decItem(item) }> &#10094; </div>
                <span className='value'> {quantity} </span>
                <div className='arrow' onClick={ () => addItem(item) }> &#10095; </div>
            </span>
            <span className='price'> ${price} </span>
            <div className='remove-button' onClick={ () => clearItem(item) }> &#x1f5d1; </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch( addItem(item) ),
    decItem: item => dispatch( decItem(item) ),
    clearItem: item => dispatch( clearItem(item) )
});

export default connect( null, mapDispatchToProps )( CheckoutItem );
