// takeEvery listens for every action of a specific type that we pass to it
// call is the code/effect inside the generator function that invokes the method
// put is the saga effect for creating action (exactly like dispatch except it has to be yielded)
// takeLatest used > takeEvery, bc for API calls, the latest request will have most up-to-date info
import { takeLatest, call, put, all } from 'redux-saga/effects';

// [ SHOP ] 
import ShopActionTypes from './shop.types'; // bc we are listening for specific action types
import { fetchCollectionsSuccess, fetchCollectionsFail } from './shop.actions';

// [ UTILS ]
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';


// function* is a generator function that pauses at user-defined yield points
// all generator functions must have yields in them
export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call( convertCollectionsSnapshotToMap, snapshot );
        
        // 'put' dispatches out an object that is expecting to have a type and data/payload
        yield put( fetchCollectionsSuccess(collectionsMap) ); 

    } catch(err) {
        yield console.log( err );
        yield put( fetchCollectionsFail(err.errorMsg) );
    };

    // original firebase code, now no longer needed. kept as reference
    // collectionRef.get()
    // .then( snapshot => {
    //     const collectionsMap = convertCollectionsSnapshotToMap( snapshot );
    //     dispatch( fetchCollectionsSuccess( collectionsMap ) );
    // })
    // .catch( err => dispatch( fetchCollectionsFail( err ) ) );
};

export function* fetchCollectionsStart() {
    // first argument is the event listener
    // second argument is another generator function that will run in response to the takeLatest listener
    // that is how to trigger our async code to run
    yield takeLatest( 
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync )
};

export function* shopSagas() {
    yield( all([
        call( fetchCollectionsStart )
    ]));
};