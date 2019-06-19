import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
/* eslint-enable no-underscore-dangle */

const initialState = {};

const middlewares = [reduxThunk];

export const createStoreWithState = state =>
  createStore(rootReducer, state, composeEnhancers(applyMiddleware(...middlewares)));

const store = createStoreWithState(initialState);

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
}

export { store };
