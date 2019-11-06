import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as hoistNonReactStatics from 'hoist-non-react-statics';
import getInjectors from './sagaInjectors';

export default ({ key = "", saga = () => {}, mode = "" }) => (WrappedComponent: React.ComponentClass) => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    static displayName = `withSaga(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    componentWillMount() {
      const { injectSaga } = this.injectors;

      injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      const { ejectSaga } = this.injectors;

      ejectSaga(key);
    }

    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props}></WrappedComponent>;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
