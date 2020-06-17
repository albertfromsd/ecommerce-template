import React from 'react';

// [ REDUX ]
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

// [ COMPONENTS ]
import CollectionItem from '../../components/Collections/CollectionItem/CollectionItem';

// [ STYLING ]
import './CollectionPage.styles.scss';

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
        <div className='collection-page'>
            <h2 className='title'> { title } Collection</h2> 
            <div className='items'>
                { items.map( item => (
                    <CollectionItem key={item.id} item={item} />
                ) ) }
            </div>
        </div>
    )
};

const mapStateToProps = ( state, ownProps ) => ({
    collection: selectCollection( ownProps.match.params.collectionName )( state )
});

export default connect( mapStateToProps )( CollectionPage );
