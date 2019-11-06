import * as React from 'react';
import getInjectors from './reducerInjectors';
import * as PropTypes from 'prop-types';
import * as hoistNonReactStatics from 'hoist-non-react-statics';
// tslint:disable-next-line: max-line-length
export default ({ key = '', reducer = (state: any, action: MainAction.Action) => {} }) => (WrappedComponent: React.ComponentClass) => {
  class ReducerInjector extends React.Component {
    public static WrappedComponent = WrappedComponent;

    public static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    public static displayName =
      `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    public injectors = getInjectors(this.context.store);

    public componentWillMount() {
      const { injectReducer } = this.injectors;

      injectReducer(key, reducer);
    }

    public render() {
      return <WrappedComponent { ...this.props } />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
