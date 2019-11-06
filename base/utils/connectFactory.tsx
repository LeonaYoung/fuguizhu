import { connect, MapStateToProps } from 'react-redux';

import { isObject, isFunction, isString } from 'lodash';
import { ActionCreator, Dispatch } from 'redux';

function withConnect(
  mapStateToProps: MapStateToProps<any, any, any>,
  actions: { [key: string]: ActionCreator<any>},
  namespace: string,
  ) {
  const mapMainStateToProps = (state: any) => {
    if (namespace && isString(namespace)) {
      return mapStateToProps(state, state.get(namespace));
    }
    return mapStateToProps(state, null);
  };

  const mapDispatchToProps = (dispatch: Dispatch) => {
    const m: {
      [key: string]: any;
    } = {};
    if (isObject(actions)) {
      Object.keys(actions).forEach((actionName) => {
        if (isFunction(actions[actionName])) {
          m[actionName] = (data: any) => dispatch(actions[actionName](data));
        }
      });
    }
    return m;
  };

  return connect(mapMainStateToProps, mapDispatchToProps);
}

// eslint-disable-next-line
const connectFactory = (namespace: string) =>
  (mapStateToProps: MapStateToProps<any, any, any>, actions: { [key: string]: ActionCreator<any>}) =>
  withConnect(mapStateToProps, actions, namespace);

export default connectFactory;
