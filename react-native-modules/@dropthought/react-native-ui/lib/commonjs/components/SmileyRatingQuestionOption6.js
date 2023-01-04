"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var _react = _interopRequireWildcard(require("react"));

var _styles = require("../styles");

var _translation = _interopRequireDefault(require("../translation"));

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _data = require("../utils/data");

var _lottieReactNative = _interopRequireDefault(require("lottie-react-native"));

var _SurveyFooter = _interopRequireDefault(require("../containers/SurveyFooter"));

var _SurveyHeader = _interopRequireDefault(require("../containers/SurveyHeader"));

var _RotaryPhonePicker = _interopRequireDefault(require("./RotaryPhonePicker"));

var _theme = require("../contexts/theme");

var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const animations = [require('../assets/animations/smiley_option6/option6_1.json'), require('../assets/animations/smiley_option6/option6_2.json'), require('../assets/animations/smiley_option6/option6_3.json'), require('../assets/animations/smiley_option6/option6_4.json'), require('../assets/animations/smiley_option6/option6_5.json')]; // We through the null text string to keep blank to make it as same as the rotary dial design.

const lotties = new Array(8).fill('');

const SmileyRatingQuestionOption6 = ({
  survey,
  pageIndex,
  question,
  forgot,
  onClose,
  onPrevPage,
  onNextPage,
  onFeedback
}) => {
  const [selectedIndex, setSelectedIndex] = _react.default.useState(0);

  const [score, setScore] = _react.default.useState(-1);

  const {
    questionId,
    scale,
    options
  } = question;
  const scaleLogicList = _data.scaleLogic[scale];
  const descriptions = scaleLogicList.map((_, index) => options[index]);
  (0, _react.useEffect)(() => {
    lotties.forEach((value, index) => {
      if (index === 0 || index > scaleLogicList.length) {
        lotties[index] = value;
      } else {
        const scaleIndex = scaleLogicList[index - 1];
        lotties[index] = animations[scaleIndex];
      }
    });
  }, [scaleLogicList]);
  const {
    colorScheme,
    customFontColor
  } = (0, _theme.useTheme)();
  const totalScore = scale;
  const renderScore = score;
  const isAtCoverScreen = score === -1;

  const updateScore = _react.default.useCallback(currentIndex => {
    setScore(currentIndex);
    setSelectedIndex(currentIndex);
    onFeedback({
      questionId,
      answers: [currentIndex - 1],
      type: 'rating'
    });
  }, [onFeedback, questionId]);

  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const textColor = customFontColor === undefined || customFontColor === '' ? _styles.Colors.white : customFontColor;
  const scoreSelectedStyle = [styles.scoreSelected, {
    color: textColor
  }];
  const descStyle = [styles.desc, {
    color: textColor
  }];
  const scoreTotalStyle = [styles.scoreTotal, {
    color: textColor
  }];
  const hintTextStyle = [commonStyles.hintText, {
    color: textColor
  }];

  const backgroundImage = require('../assets/bg-option6.png');

  const imageStyle = {
    opacity: colorScheme === _theme.COLOR_SCHEMES.light ? 0.6 : 0
  };

  const lottieContainer = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.lottieContainer
  }, /*#__PURE__*/_react.default.createElement(_lottieReactNative.default, {
    source: lotties[selectedIndex],
    autoPlay: true
  }));

  const scoreContainer = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.scoreContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.scoreContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.scoreText
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: scoreSelectedStyle
  }, renderScore), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: scoreTotalStyle
  }, '/' + totalScore)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: descStyle
  }, descriptions[selectedIndex - 1])));

  return /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
    source: backgroundImage,
    resizeMethod: "auto",
    style: commonStyles.imageBackground,
    imageStyle: imageStyle
  }, /*#__PURE__*/_react.default.createElement(_SurveyHeader.default, {
    survey: survey,
    pageIndex: pageIndex,
    question: question,
    onClose: onClose
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.container
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    question: question,
    forgot: forgot
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.contentContainer
  }, isAtCoverScreen ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.hintContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: hintTextStyle
  }, _translation.default.t('option6HintDescription:title'))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, lottieContainer, scoreContainer))), /*#__PURE__*/_react.default.createElement(_SurveyFooter.default, {
    surveyColor: survey.surveyProperty.hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1,
    onPrevPage: onPrevPage,
    onNextPage: onNextPage
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.picker
  }, /*#__PURE__*/_react.default.createElement(_RotaryPhonePicker.default, {
    list: lotties,
    scale: scale,
    selectedIndex: selectedIndex,
    updateScore: updateScore
  })));
};

var _default = SmileyRatingQuestionOption6;
exports.default = _default;

const commonStyles = _reactNative.StyleSheet.create({
  imageBackground: {
    backgroundColor: _styles.Colors.black,
    height: '100%',
    overflow: 'hidden'
  },
  image: {
    opacity: 0.6
  },
  container: {
    flex: 1,
    paddingHorizontal: 42,
    flexDirection: 'column',
    alignItems: 'center'
  },
  contentContainer: {
    width: '100%',
    flex: 5,
    alignItems: 'center'
  },
  hintContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  hintText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 6
  },
  lottieContainer: {
    flex: 1,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreContainer: {
    flex: 2,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline'
  },
  picker: {
    alignItems: 'center',
    height: 120
  }
});

const phoneStyles = _reactNative.StyleSheet.create({
  desc: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  scoreSelected: {
    fontSize: 90,
    textAlign: 'center',
    alignItems: 'baseline'
  },
  scoreTotal: {
    fontSize: 70,
    color: _styles.Colors.smileyRatingScoreGray
  }
});

const tabletStyles = _reactNative.StyleSheet.create({
  desc: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  scoreSelected: {
    fontSize: 74,
    textAlign: 'center',
    alignItems: 'baseline'
  },
  scoreTotal: {
    fontSize: 55,
    color: _styles.Colors.smileyRatingScoreGray
  }
});
//# sourceMappingURL=SmileyRatingQuestionOption6.js.map