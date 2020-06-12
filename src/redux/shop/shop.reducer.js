import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    collections: null,
    isLoading: false,
    isLoaded: false,
    errorMsg: undefined
};

const shopReducer = ( state=INITIAL_STATE, action ) => {
    switch( action.type ) {  
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            };

        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                collections: action.data
            };
    
        case ShopActionTypes.FETCH_COLLECTIONS_FAIL:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                errorMsg: action.data
            };
            
        default:
            return state
    }
};

export default shopReducer;