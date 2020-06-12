// [ USER ]
import UserActionTypes from './user.types';
import { 
    loginSuccess,
    loginFail, 
    logoutSuccess, 
    logoutFail, 
    registerSuccess, 
    registerFail } from './user.actions';

// [ REDUX ]
import { takeLatest, put, all, call } from 'redux-saga/effects';

// [ UTILS ] 
import { 
    auth, 
    googleProvider, 
    createUserProfileDoc,
    getCurrentUser } from '../../firebase/firebase.utils';


// General user snapshot for both login methods
export function* getSnapShotFromUserAuth( userAuth, additionalData ) {
    try { 
        const userRef = yield call( createUserProfileDoc, userAuth, additionalData );
        const userSnapshot = yield userRef.get();
        yield put( loginSuccess({ id: userSnapshot.id, ...userSnapshot.data() }) );
    } catch( err ) {
        yield put( loginFail(err) );
    };
};

// register
export function* register({ data: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword( email, password );
        yield put( registerSuccess({ user, additionalData: { displayName } }) );
    } catch( error ) {
        yield put( registerFail(error) );
    };
};

export function* loginAfterRegistration({ data: { user, additionalData } }) {
    yield getSnapShotFromUserAuth( user, additionalData );
};

export function* onRegisterStart() {
    yield takeLatest(
        UserActionTypes.REGISTER_START,
        register
    );
};

export function* onRegisterSuccess() {
    yield takeLatest(
        UserActionTypes.REGISTER_SUCCESS,
        loginAfterRegistration
    );
};

// log in with GOOGLE
export function* loginWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup( googleProvider );
        yield getSnapShotFromUserAuth( user );
    } catch( err ) {
        yield put( loginFail(err) );
    };
};

export function* onGoogleLoginStart() {
    console.log( "Google login saga started" );

    yield takeLatest(
        UserActionTypes.GOOGLE_LOGIN_START, 
        loginWithGoogle 
    );
};

// login with EMAIL
export function* loginWithEmail({ data: { email, password } }) {
    try{
        const { user } = yield auth.signInWithEmailAndPassword( email, password );
        yield getSnapShotFromUserAuth( user );
    } catch( err ) {
        yield put( loginFail(err) );
    };
};

export function* onEmailLoginStart() {
    yield takeLatest( 
        UserActionTypes.EMAIL_LOGIN_START,
        loginWithEmail
    );
};

// check user session
export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if( !userAuth ) return;
        yield getSnapShotFromUserAuth( userAuth );
    } catch( err ) {
        yield put( loginFail(err) );
    };
};

export function* onCheckUserSession() {
    yield takeLatest(
        UserActionTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    );
};

export function* logout() {
    try {
        yield auth.signOut();
        yield put( logoutSuccess() );
    } catch( error ) {
        yield put( logoutFail(error) );
    };
};

export function* onLogoutStart() {
    yield takeLatest(
        UserActionTypes.USER_LOGOUT_START,
        logout
    );
};

// userSagas listening for functions with these names
export function* userSagas() {
    yield all([ 
        call( onGoogleLoginStart ),
        call( onEmailLoginStart ),
        call( onCheckUserSession ),
        call( onLogoutStart ),
        call( onRegisterStart ),
        call( onRegisterSuccess ),
    ]);
};