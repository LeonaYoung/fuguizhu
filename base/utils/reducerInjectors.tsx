import * as invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';

import createReducer from '../state/reducers';

export function injectReducerFactory(store: any, isVaild: boolean) {
  return function injectReducer(key: string, reducer: (state: any, action: MainAction.Action) => any) {
    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      'injectReducer: Expected `reducer` to be a reducer function',
    );

    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) { return; }

    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store: any) {
  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
