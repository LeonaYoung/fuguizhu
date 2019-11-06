/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import * as enLocaleData from 'react-intl/locale-data/en';
import * as zhLocaleData from 'react-intl/locale-data/zh';
const DEFAULT_LOCALE = 'zh';
const zhTranslationMessages = require('../../src/translations/zh.json');
const enTranslationMessages = require('../../src/translations/en.json');

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

export const getLanguage = () => ('zh');

export const appLocales = [
  'zh',
  'en',
];

interface Messages {
  [key: string]: string;
}

interface MessagesMap {
  en: Messages;
  zh: Messages;
  [key: string]: any;
}

export function formatTranslationMessages(locale: string, messages: Messages): Messages {
  const defaultFormattedMessages: Messages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};

  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return {
      ...formattedMessages,
      [key]: formattedMessage,
    }
  }, {});
};

export const translationMessages: MessagesMap = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
};

export const getFormattedMessages = (locale = DEFAULT_LOCALE, key: string, messageDescriptor: any) => {
  const messages = translationMessages[locale];
  if (messages) {
    if (messages[key]) {
      return messages[key];
    } else if (messageDescriptor && messageDescriptor.defaultMessage) {
      return messageDescriptor.defaultMessage;
    } else {
      return '';
    }
  }
  return key;
};
