import React from 'react';

// [ REDUX ]
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../../redux/shop/shop.selectors';

// [ COMPONENTS ]
import CollectionPreview from '../CollectionPreview/CollectionPreview';

// [ STYLING ]
import './CollectionsOverview.styles.scss';

const CollectionsOverview = ({ collections }) => {

    return (
        <div className='collections-overview'>
            { collections.map( ({id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
                ) ) 
            };
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview,
});

export default connect( mapStateToProps )( CollectionsOverview );
