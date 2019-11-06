import { createStore, applyMiddleware, compose, Store } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';
import asyncSaga from './saga';

type MainStore = Store & {
  runSaga: any,
  injectedReducers: object,
  injectedSagas: object,
};

const sagaMiddleware = createSagaMiddleware();

export default function storeFactory(initialState = {}) {
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    // eslint-disable-next-line
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    // eslint-disable-next-line
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
    : compose;

  const store: MainStore = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  store.runSaga = sagaMiddleware.run;

  store.injectedReducers = {}; // Reducer registry

  // Saga registry
  store.injectedSagas = {
    asyncSaga: { task: store.runSaga(asyncSaga) },
  };

  return store;
}
