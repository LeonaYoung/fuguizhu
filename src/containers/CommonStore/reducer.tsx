import { fromJS } from 'immutable';

import {
  UPDATE_DATA,
} from './constants';

export interface IStore {
  test: string;
}

const initialState = fromJS({
  test: '',
});

function reducer(state = initialState, action: MainAction.Action) {
  switch (action.type) {
    case UPDATE_DATA:
      if (action.payload) {
        return state
          .set('test', fromJS(action.payload));
      }
      return state;
    default:
      break;
  }
  return state;
}

export default reducer;
