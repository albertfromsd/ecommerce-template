import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

// [ REDUX ]
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectHasCollectionLoaded, selectIsCollectionLoading } from '../../redux/shop/shop.selectors';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

// [ STYLING ]
import './ShopPage.styles.scss';

// [ COMPONENTS ]
import Spinner from '../../components/Spinner/Spinner';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

// [ VIEWS: DYNAMIC IMPORTS ]
const CollectionsOverview = lazy( () => 
    import('../../components/Collections/CollectionsOverview/CollectionsOverview') );
const CollectionPage = lazy( () => 
    import('../CollectionPage/CollectionPage') );



const ShopPage = ({ match, fetchCollectionsStart }) => {

    useEffect( () => {
        fetchCollectionsStart();

    }, [fetchCollectionsStart]);

    return (
        <ErrorBoundary>
            <Suspense fallback={ <Spinner/> } >
                <div className='shop-page'>
                    <h1 className='page-title'><a href="/shop"> SHOP </a></h1>
                        <br/>
                    <Route exact path={`${match.path}`} 
                        component={CollectionsOverview} /> 
                    <Route path={`${match.path}/:collectionName`} 
                        component={CollectionPage} />
                </div>
            </Suspense>
        </ErrorBoundary>
    )
}

const mapStateToProps = createStructuredSelector({
    isCollectionLoading: selectIsCollectionLoading,
    hasCollectionLoaded: selectHasCollectionLoaded,
})


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch( fetchCollectionsStart() )
});

export default connect( mapStateToProps, mapDispatchToProps)( ShopPage );
