import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  injectIntl, InjectedIntlProps, intlShape,
} from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectLang } from 'base/state/selectors';
import { toggleLang } from 'base/state/actions';

interface IProps extends InjectedIntlProps {
  lang?: string;
  toggleLang?: any;
}

class Main extends React.Component<IProps, {}> {

  public static contextTypes = {
    intl: intlShape,
  };

  public render() {
    return (
      <h1>Main</h1>
    );
  }
}

export default compose(
  connect(
    createStructuredSelector({
      lang: selectLang,
    }), {
      toggleLang,
    },
  ),
  injectIntl,
)(Main);
