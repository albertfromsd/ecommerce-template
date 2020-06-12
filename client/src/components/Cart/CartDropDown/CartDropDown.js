import React from 'react';
import { withRouter } from 'react-router-dom';

// [ REDUX ]
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../../redux/cart/cart.selectors';
import { toggleCartDropDown } from '../../../redux/cart/cart.actions';

// [ STYLING ]
import './CartDropDown.styles.scss';

// [ COMPONENTS ]
import CustomButton from '../../CustomButton/CustomButton';
import CartItem from '../../Cart/CartItem/CartItem';


const CartDropDown = ({ items, history, dispatch }) => {

    const handleClick = e => {
        history.push('/checkout');
        dispatch( toggleCartDropDown() );
    };

    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                { items.length
                    ? ( items.map( item => <CartItem key={item.id} item={item} /> ) )
                    : <span className='empty-message'> Your cart is empty </span>
                }
                </div>
            <CustomButton onClick={handleClick}> 
                GO TO CHECKOUT </CustomButton>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    items: selectCartItems
});

// all higher order components can take components as an argument
// withRouter passes match history and location objects
// we want what comes out of the connect component to be passed into withRouter
export default withRouter( connect( mapStateToProps )( CartDropDown ) );
