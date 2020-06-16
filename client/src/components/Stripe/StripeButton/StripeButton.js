import React from 'react';

import { connect } from 'react-redux';
import { clearCart } from '../../../redux/cart/cart.actions';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeButton = ({ price, clearCartItems }) => {

    const priceForStripe = price * 100;
    const publishableKey = "pk_test_Hj0vVLm173cqB1IKRr4wvN3J00jRQ7cgti";

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then( (res) => {
            alert('Payment Successful!');
            clearCartItems();
        }).catch( (err) => {
            alert( 'Unsuccessful!' );
            console.log( 'Unsuccessful payment: ', err );
        });
    };

    return (
        <StripeCheckout 
            label='Pay Now'
            name='eCommerce-Template'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

const mapDispatchToProps = dispatch => ({
    clearCartItems: () => dispatch( clearCart() )
});

export default connect( null, mapDispatchToProps)( StripeButton );
