/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { selectLang } from '../../state/selectors';
import ProjectConfig from '../../config-bridge';

interface IProps {
  locale?: string;
  messages?: IMessages;
  children: any;
}

interface IMessages {
  [key: string]: string;
}

const defaultLocale = ProjectConfig.i18n.defaultLocale;

class LanguageProvider extends React.PureComponent<IProps, object> {
  public render() {
    const { locale = defaultLocale, messages = {} } = this.props;
    const msg = messages[locale];
    return (
      <IntlProvider
        locale = { locale }
        key = { locale }
        messages = { msg }
        defaultLocale = { defaultLocale }
      >
        { React.Children.only(this.props.children) }
      </IntlProvider>
    );
  }
}

export default connect(createSelector(
  selectLang,
  (locale) => ({ locale }),
))(LanguageProvider);
