import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import combineReducers from '../_reducers';
import InitialState from './InitialState';

function configureStoreProd(initialState) {
    const middlewares = [
        thunk,
    ];

    return createStore(combineReducers, initialState, compose(
        applyMiddleware(...middlewares)
    ));
}

const configureStore = configureStoreProd(InitialState);

export default configureStore;