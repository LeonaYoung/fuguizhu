import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import LanguageProvider from 'base/containers/LanguageProvider';
import { translationMessages } from 'base/utils/i18n';
import storeFactory from 'base/state/storeFactory';

import Main from './containers/Main';

const rootElement = document.getElementById('root');
const initialState = {};
const store = storeFactory(initialState);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <Main/>
      </LanguageProvider>
    </Provider>,
    rootElement,
  );
};

if ((module as any).hot) {
  (module as any).hot.accept(['base/utils/i18n', 'containers/Main'], () => {
    ReactDOM.unmountComponentAtNode(rootElement);
    render();
  });
}

render();
