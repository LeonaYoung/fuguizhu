import {
  UPDATE_LANGUAGE,
} from '../utils/constants';

export function toggleLang(payload: any): MainAction.Action {
  return {
    type: UPDATE_LANGUAGE,
    payload,
  };
}

export default {};
