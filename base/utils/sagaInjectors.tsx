import { isEmpty, isFunction, isString, conformsTo} from 'lodash';
import * as invariant from 'invariant';

import {
  DAEMON,
  ONCE_TILL_UNMOUNT,
  RESTART_ON_REMOUNT,
} from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = (key: string) => invariant(
  isString(key) && !isEmpty(key),
  'injectSaga: Expected `key` to be a non empty string',
);

const checkDescriptor = (descriptor: any) => {
  const shape = {
    saga: isFunction,
    mode: (mode: any) => isString(mode) && allowedModes.indexOf(mode) > -1,
  };

  invariant(
    conformsTo(descriptor, shape),
    'injectSaga: Expected a valid saga descriptor',
  );
};

interface Descriptor {
  mode?: string;
  saga?: any;
};

export function injectSagaFactory(store: any, isValid: boolean) {
  return function injectSaga(key: string, descriptor: Descriptor, args: any) {

    const newDescriptor = { ...descriptor, mode: descriptor.mode || RESTART_ON_REMOUNT };
    const { saga, mode } = newDescriptor;

    checkKey(key);
    checkDescriptor(newDescriptor);

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key];
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      // eslint-disable-next-line
      store.injectedSagas[key] = { ...newDescriptor, task: store.runSaga(saga, args) };
    }
  };
}

export function ejectSagaFactory(store: any, isValid: boolean) {
  return function ejectSaga(key: string) {

    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];

      if (descriptor.mode !== DAEMON) {
        descriptor.task.cancel();

        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

export default function getInjectors(store: any) {

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true),
  };
}
