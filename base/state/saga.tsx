
import { notification } from 'antd';
import { isFunction, isEmpty } from 'lodash';

import {
  take,
  fork,
  call,
  put,
  cancel,
} from 'redux-saga/effects';

import ProjectConfig from '../config-bridge';
// const { gotoPass } = ProjectConfig.passConf;

export const getSagaFetchActionType = (actionType: string) => actionType && actionType.split('_')[1];

function* fetchSaga(action: any) {
}

// The watcher: watch actions and coordinate worker tasks
function* watchFetchRequests() {
}

export default watchFetchRequests;
