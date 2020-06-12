import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'
import rootReducer from './root-reducer';

// [ MIDDLEWARES ]
import logger from 'redux-logger'; // console.log redux calls/changes before hitting reducer
import createSagaMiddleware from 'redux-saga'; // to replace thunk and handle async actions
import rootSaga from './root-saga';


const sagaMiddleware = createSagaMiddleware();

const middlewares = [ sagaMiddleware ];
if( process.env.NODE_ENV === 'development') {
    middlewares.push( logger );
};

// after applyMiddleware gets run below, we can then run sagaMiddleware with the imported saga function
export const store = createStore( rootReducer, applyMiddleware(...middlewares) );
sagaMiddleware.run( rootSaga );

export const persistor = persistStore( store );