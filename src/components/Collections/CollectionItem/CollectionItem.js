import React from 'react';

// [ REDUX ]
import { connect } from 'react-redux';
import { addItem } from '../../../redux/cart/cart.actions';

// [ STYLING ]
import './CollectionItem.styles.scss';

// [ COMPONENTS ]
import CustomButton from '../../CustomButton/CustomButton';

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;

    const preventFocus = () => {
        let ae = document.activeElement;
        setTimeout( function() { ae.focus() }, 1);
    };

    return (
        <div className='collection-item'>
            <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
            <CustomButton className='custom-button' onMouseDown={preventFocus} onClick={ () => addItem( item ) } inverted> 
                Add to Cart 
            </CustomButton>
            <div className='collection-footer'>
                <span className='name'> { name } </span>
                <span className='price'> ${ price } </span>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch( addItem( item ) )
});

export default connect( null, mapDispatchToProps )( CollectionItem );
