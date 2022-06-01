import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { opacity10, opacity60, Colors } from '../styles';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

const SurveyPageIndicator = props => {
  const {
    survey,
    pageIndex = 0,
    rtl
  } = props;
  const {
    colorScheme
  } = useTheme();
  const isDarkMode = colorScheme === COLOR_SCHEMES.dark;
  const themeColor = survey.surveyProperty.hexCode;
  const dimensionWidthType = useDimensionWidthType();
  const dimensionStyles = dimensionWidthType === DimensionWidthType.phone ? phoneStyles : tabletStyles;
  const currentPage = survey.pages[pageIndex];
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, dimensionStyles.container, {
      backgroundColor: opacity10(themeColor)
    }, isDarkMode && styles.darkModeContainer, rtl ? styles.rtl : {}]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.title, dimensionStyles.title, isDarkMode && styles.darkModeTitle]
  }, currentPage.pageTitle));
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 40,
    width: '100%'
  },
  darkModeContainer: {
    backgroundColor: '#39393a'
  },
  title: {
    fontWeight: '600'
  },
  darkModeTitle: {
    color: opacity60(Colors.white)
  },
  rtl: {
    alignItems: 'flex-end'
  }
});
const phoneStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 14,
    letterSpacing: 0.42,
    color: Colors.progressBarText
  }
});
const tabletStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 35
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.48
  }
});
export default /*#__PURE__*/React.memo(SurveyPageIndicator);
//# sourceMappingURL=SurveyPageIndicator.js.map