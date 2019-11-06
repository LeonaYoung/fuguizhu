import { keys } from 'ts-transformer-keys';
import { IStore } from './reducer';
import selectorsFactory from 'base/utils/selectorsFactory';
import { NAMESPACE } from './constants';

const selectors = selectorsFactory(NAMESPACE, keys<IStore>());

export default selectors;
