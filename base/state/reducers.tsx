import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import {
  UPDATE_LANGUAGE,
} from 'base/utils/constants';

import { getLanguage } from 'base/utils/i18n';

import CommonStore from '../../src/containers/CommonStore/reducer';

const initialState = fromJS({
  lang: getLanguage(),
});

function globalReducer(state = initialState, action: MainAction.Action) {
  switch (action.type) {
    case UPDATE_LANGUAGE:
      return state.set('lang', action.payload);
    default:
      break;
  }
  return state;
}

export default function createReducer(injectedReducers?: object) {
  return combineReducers({
    global: globalReducer,
    fgz: CommonStore,
    ...injectedReducers,
  });
}
