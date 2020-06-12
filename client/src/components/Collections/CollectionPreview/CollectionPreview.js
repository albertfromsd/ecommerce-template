import React from 'react';
import { withRouter } from 'react-router-dom';

// [ STYLING ]
import './CollectionPreview.styles.scss';

// [ COMPONENTS]
import CollectionItem from '../CollectionItem/CollectionItem';

const CollectionPreview = ({ title, items, match, history }) => {

    const redirectToCollection = e => {
        history.push(`${match.url}/${title.toLowerCase()}`);
    };

    return(
        <div className='collection-preview'>
            <h1 className='title'>
                <span className='title-link' onClick={redirectToCollection}> 
                 { title.toUpperCase() } <span className='hidden-message'> ...click to see more </span>
                </span>
            </h1>
            <div className='preview'>
            { items
                .filter( (item, index) => index < 4 )
                .map( item => (
                    <CollectionItem key={ item.id } item={item} />
                ))
            }
            </div>
        </div>
    )
};

export default withRouter( CollectionPreview );