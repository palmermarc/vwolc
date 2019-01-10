import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import combineReducers from '../_reducers';
import InitialState from './InitialState';

function configureStoreProd(initialState) {
    const middlewares = [
        thunk,
    ];

    return createStore(combineReducers, initialState, compose(
        applyMiddleware(thunk)
    ));
}

function configureStoreDev(initialState) {
    const middlewares = [
      thunk,
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(combineReducers, initialState, composeEnhancers(
      applyMiddleware(thunk)
      )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../_reducers', () => {
            const nextReducer = require('../_reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd(InitialState) : configureStoreDev(InitialState);

export default configureStore;