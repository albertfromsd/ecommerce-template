import ShopActionTypes from './shop.types';

// [ UTILS ] // used here with thunk, but no longer necessary as the firestore call is now made in shop.sagas
// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';


export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    data: collectionsMap
});

export const fetchCollectionsFail = errorMsg => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAIL,
    data: errorMsg
});

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});



// written here while still using thunk
// moved to shop.sagas 2020-06-02

// export const fetchCollectionsStartAsync = () => {
//     return dispatch => {
//         const collectionRef = firestore.collection('collections');
//         dispatch( fetchCollectionsStart );

//         collectionRef.get()
//         .then( snapshot => {
//             const collectionsMap = convertCollectionsSnapshotToMap( snapshot );
//             dispatch( fetchCollectionsSuccess( collectionsMap ) );
//         })
//         .catch( err => dispatch( fetchCollectionsFail( err ) ) );
//     };
// };

