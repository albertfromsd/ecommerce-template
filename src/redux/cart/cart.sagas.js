import UserActionTypes from '../user/user.types';

import { all, call, takeLatest, put } from 'redux-saga/effects';
import { clearCart } from './cart.actions';


export function* clearCartOnLogout() {
    yield put( clearCart() );
};

export function* onLogoutSuccess() {
    yield takeLatest(
        UserActionTypes.USER_LOGOUT_SUCCESS,
        clearCartOnLogout
    );
};

export function* cartSagas() {
    yield( all([
        call( onLogoutSuccess ),
    ]));
};