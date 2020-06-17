import UserActionTypes from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    errorMsg: null
};

const userReducer = ( state=INITIAL_STATE, action ) => {
    switch( action.type ) {
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state, 
                currentUser: action.data,
                errorMsg: null
            };

        case UserActionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                errorMsg: null
            };

        // stacking cases will result in either of them triggering the equivalent return
        case UserActionTypes.LOGIN_FAIL:
        case UserActionTypes.REGISTER_FAIL:
        case UserActionTypes.USER_LOGOUT_FAIL:
            return {
                ...state, 
                errorMsg: action.data
            };
            
        default:
            return state;
    };
};

export default userReducer;