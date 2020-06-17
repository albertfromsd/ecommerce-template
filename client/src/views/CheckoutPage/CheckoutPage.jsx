import React from 'react';

// [ REDUX ]
import { connect } from 'react-redux';
import { createStructuredSelector } from'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

// [ STYLING ]
import './CheckoutPage.styles.scss';

// [ COMPONENTS ]
import CheckoutItem from '../../components/Cart/CheckoutItem/CheckoutItem';
import StripeButton from '../../components/Stripe/StripeButton/StripeButton';

const CheckoutPage = ({ items, total }) => {
    return (
        <div className='checkout-page'> 
            <div className='checkout-header'>
                <div className='header-block'>
                    <span> Product </span>
                </div>
                <div className='header-block'>
                    <span> Description </span>
                </div>
                <div className='header-block'>
                    <span> Quantity </span>
                </div>
                <div className='header-block'>
                    <span> Price </span>
                </div>
                <div className='header-block'>
                    <span> Remove </span>
                </div>
            </div>
            { items.map( item => 
                <CheckoutItem key={item.id} item={item} />
            )}
            <div className='total'> TOTAL: ${total} </div>
            <br />
            <div className='test-warning'>
                * Please use the following test credit card information for payments *
                <br />
                4242 4242 4242 4242 - Exp: 5/25 - CVV: 123
                <br /> <br />
            </div>
            <StripeButton price={total} />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    items: selectCartItems,
    total: selectCartTotal
});

const mapDispatchToProps = dispatch => ({

});

export default connect( mapStateToProps, mapDispatchToProps )( CheckoutPage );
