import firebase from 'firebase/app'; // base firebase import
import 'firebase/firestore'; // firebase database
import 'firebase/auth'; // firebase authentication

// firebaseConfig object which was copied from firebase site </> symbol
const config = {
    apiKey: "AIzaSyAPDCo56utYn0NVUUOAT392n18XdUxelZY",
    authDomain: "ecommercesite-ae083.firebaseapp.com",
    databaseURL: "https://ecommercesite-ae083.firebaseio.com",
    projectId: "ecommercesite-ae083",
    storageBucket: "ecommercesite-ae083.appspot.com",
    messagingSenderId: "520864408701",
    appId: "1:520864408701:web:5dfa0dd960a00e6030bd14",
    measurementId: "G-VYN77W82RN"
};


firebase.initializeApp(config);

export const createUserProfileDoc = async ( userAuth, additionalData ) => {
    if( !userAuth ) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userSnapshot = await userRef.get();

    if( !userSnapshot.exists ) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch( error ) {
            console.log( 'Error creating user: ', error.message );
        };
    };
    return userRef;
};

// below for updating/adding new collection SHOP_DATA (linked to eCommerceApp)
export const addCollectionAndDocs = async ( collectionName, objectsToAdd ) => {
    const collectionRef = firestore.collection(collectionName);

    const batch = firestore.batch();

    objectsToAdd.forEach( obj => {
        const newDocRef = collectionRef.doc();
        batch.set( newDocRef, obj );
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map( doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI( title.toLowerCase() ),
            id: doc.id,
            title,
            items
        };
    });
    
    return transformedCollection.reduce( ( acc, collection ) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});
};

export const getCurrentUser = () => {
    return new Promise(( resolve, reject ) => {
        const unsubscribe = auth.onAuthStateChanged( userAuth => {
            unsubscribe();
            resolve( userAuth );
        }, reject )
    })
}

// export firestore and auth
export const firestore = firebase.firestore();
export const auth = firebase.auth();

// Google authentication utility
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
// can choose among several signInWith options, but in this case, it will be a Popup
export const loginWithGoogle = () => auth.loginWithPopup(googleProvider);

export default firebase;