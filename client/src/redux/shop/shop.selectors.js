import { createSelector } from 'reselect';


const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [ selectShop ],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [ selectCollections ],
    collections => collections 
        ? Object.keys(collections).map(key => collections[key])
        // what is difference between empty array here and null value below in selectCollection
        : []
);

export const selectCollection = collectionName => 
    createSelector(
        [ selectCollections ],
        collections => collections 
            ? collections[collectionName]
            // what is difference between null value here and empty array in slectCollectionsPreview
            : null
    )

export const selectIsCollectionLoading = createSelector(
    [ selectShop ],
    shop => shop.isLoading
);

export const selectHasCollectionLoaded = createSelector(
    [ selectShop ],
    shop => !!shop.isLoaded
);