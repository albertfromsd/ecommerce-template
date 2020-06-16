import React from 'react';

import { connect } from 'react-redux';
import { clearCart } from '../../../redux/cart/cart.actions';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeButton = ({ price, clearCart }) => {

    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51Gul0eLgCAAHpg1pCA7UE9fJZzWgwyNbga8AuVG4R1wsYZEVy4NsfVzM4sSC6byFfstiXv8ln2ACKoRLBYnWqF2y00dpf0yB8G";

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then( res => {
            alert('Payment Successful!');
            clearCart();
        }).catch( err => {
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
            image='https:/svgshare.com/i/CUz.svg'
            description={`your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

const mapDispatchToProps = dispatch => ({
    clearCart: () => dispatch( clearCart() )
});

export default connect( null, mapDispatchToProps)( StripeButton );
