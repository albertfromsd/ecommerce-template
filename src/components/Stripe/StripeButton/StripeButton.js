import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

// [ STYLING ]
import './StripeButton.styles';

const StripeButton = ({ price }) => {

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
        }).then( res => {
            alert('Payment Successful!');
        }).catch( err => {
            alert( 'Payment unsuccessful. Please check your credit card information' );
            console.log( 'Payment was unsuccessful: ', JSON.parse( err ) );
        });
    };

    return (
        <StripeCheckout 
            label='Pay Now'
            name='eCommerce Site'
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

export default StripeButton;
