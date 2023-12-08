import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SurveyContextProvider } from './contexts/survey';
import { CustomPropsContextProvider } from './contexts/custom-props';
import SurveyStackContainer from './SurveyStackContainer';
import { FeedbackProvider } from '@dropthought/react-native-ui/src/contexts/feedback';

/** @typedef {"system" | "light" | "dark"} ThemeType */

/**
 * @typedef {object} SDKEntryOwnProps
 * @property {string} apiKey
 * @property {string=} visibilityId
 * @property {string=} surveyId
 * @property {string=} defaultLanguage if not provided, default is "en"
 * @property {string=} baseURL if not provided, default is ...
 * @property {()=>void=} onClose when the close icon is pressed in the header
 * @property {THEME_OPTION} themeOption
 * @property {ThemeType=} appearance
 * @property {string=} fontColor
 * @property {string=} backgroundColor
 * @property {string=} timezone
 * @property {boolean=} preview
 */

/**
 * @typedef {import('./contexts/custom-props').CustomProps & SDKEntryOwnProps} SDKEntryProps
 */

/**
 * @param {SDKEntryProps} props
 */
export default function SDKEntry(props) {
  return /*#__PURE__*/React.createElement(SafeAreaProvider, null, /*#__PURE__*/React.createElement(FeedbackProvider, null, /*#__PURE__*/React.createElement(CustomPropsContextProvider, props, /*#__PURE__*/React.createElement(SurveyContextProvider, props, /*#__PURE__*/React.createElement(SurveyStackContainer, {
    preview: props.preview
  })))));
}
//# sourceMappingURL=SDKEntry.js.map