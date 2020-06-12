import React from 'react';

// [ REDUX ]
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toggleCartDropDown } from '../../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../../redux/cart/cart.selectors';

// [ STYLING ]
import './CartIcon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../../assets/cart-icon.svg';


const CartIcon = ({ toggleCartDropDown, itemCount }) => {

    return (
        <div className='cart-icon'>
            <ShoppingIcon className='shopping-icon' onClick={toggleCartDropDown} />
            <span className='item-count'> { itemCount } </span>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
    toggleCartDropDown: () => dispatch( toggleCartDropDown() )
});

export default connect( mapStateToProps, mapDispatchToProps )( CartIcon );
