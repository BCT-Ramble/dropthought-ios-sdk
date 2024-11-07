import React from 'react';
import { View, StyleSheet } from 'react-native';
import GlobalStyle, { addOpacityToHex, Colors } from '../styles';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import { QuestionBrandType } from '../utils/data';
import usePolling from '../hooks/usePolling';
import ActivityIndicatorMask from './ActivityIndicatorMask';
import PollingItem from './PollingItem';
import { useTheme, COLOR_SCHEMES } from '@dropthought/react-native-ui';
const ClassicPollingQuestion = ({
  mandatoryErrorMessage,
  question,
  feedback,
  onFeedback,
  forgot,
  onPostPollChoice,
  isPostingPollChoice
}) => {
  const {
    selectedOption,
    onPoll,
    pollingResult
  } = usePolling(question, onFeedback, onPostPollChoice, feedback);
  const {
    options,
    optionIds,
    questionBrand,
    otherText,
    otherTextLabel
  } = question;
  const {
    colorScheme
  } = useTheme();
  const isDarkMode = colorScheme === COLOR_SCHEMES.dark;
  const hasSelectedOption = selectedOption !== undefined;
  const optionList = () => {
    const {
      choice: selectedChoice,
      otherFlag: selectedIsOther = false
    } = selectedOption || {};
    const result = options === null || options === void 0 ? void 0 : options.map((title, index) => {
      const choice = `${optionIds === null || optionIds === void 0 ? void 0 : optionIds[index]}` || '';
      const option = {
        title,
        choice,
        otherFlag: false
      };
      const isSelected = choice === selectedChoice;
      const percentage = pollingResult !== undefined ? pollingResult[choice] : undefined;
      return /*#__PURE__*/React.createElement(PollingItem, {
        disabled: hasSelectedOption,
        option: option,
        selected: isSelected,
        percentage: percentage,
        onPoll: onPoll,
        feedback: feedback,
        key: `${title}-${selectedChoice}`
      });
    });
    if (questionBrand === QuestionBrandType.Other) {
      if (feedback && !feedback.otherFlag) return result;
      const option = {
        title: otherTextLabel,
        choice: '',
        otherFlag: true
      };
      result === null || result === void 0 || result.push( /*#__PURE__*/React.createElement(PollingItem, {
        disabled: hasSelectedOption,
        option: option,
        selected: selectedIsOther,
        placeholder: otherText,
        onPoll: onPoll,
        feedback: feedback,
        key: `Other`
      }));
    }
    return result;
  };
  const maskStyle = isDarkMode ? {
    backgroundColor: addOpacityToHex(Colors.backgroundColorDark, 0.5)
  } : undefined;
  return /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.questionContainer
  }, /*#__PURE__*/React.createElement(ClassicMandatoryTitle, {
    forgot: forgot,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question,
    subTitleMessage: `Heads up! Once you’ve made your selection, it cannot be changed.`,
    style: styles.mandatoryTitle
  }), optionList(), /*#__PURE__*/React.createElement(ActivityIndicatorMask, {
    loading: isPostingPollChoice,
    style: maskStyle
  }));
};
export default /*#__PURE__*/React.memo(ClassicPollingQuestion);
const styles = StyleSheet.create({
  mandatoryTitle: {
    marginBottom: 12
  }
});
//# sourceMappingURL=ClassicPollingQuestion.js.map