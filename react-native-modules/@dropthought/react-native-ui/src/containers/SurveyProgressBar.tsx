import * as React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { sum } from 'ramda';
// @ts-ignore
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '@react-native-community/hooks';

import ClassicProgressBar from '../components/ClassicProgressBar';
import { useFeedbackState } from '../contexts/feedback';
import { opacity10 } from '../styles';
import type { Survey, Feedback } from '../data';
import { useTheme } from '../contexts/theme';

const numValidFeedbacks = ({
  answeredQuestionIds,
  feedbacksMap,
}: {
  answeredQuestionIds: string[];
  feedbacksMap: { [key: string]: Feedback };
}) => {
  return answeredQuestionIds.filter((qid) => {
    const feedback = feedbacksMap[qid];

    // if no answers or 0 length, filter out
    if (!feedback || !feedback.answers || !feedback.answers.length) {
      return false;
    }

    // a special case: answers: [""], should also consider as invalid
    const answer = feedback.answers[0];
    if (typeof answer === 'string' && !answer.length) {
      return false;
    }

    return true;
  }).length;
};

const numTotalQuestions = (survey: Survey) => {
  const questionNumOfPages = survey.pages.map((page) => page.questions.length);
  return sum(questionNumOfPages);
};

const isAndroid = Platform.OS === 'android';

type Props = {
  rtl: boolean;
  survey: Survey;
};

const SurveyProgressBar = ({ rtl, ...props }: Props) => {
  const feedbackState = useFeedbackState();
  const { hexCode } = useTheme();
  const themeColor = hexCode;
  const insets = useSafeAreaInsets();
  const { keyboardShown } = useKeyboard();

  const insetsBottom =
    // if it is android, and the insets bottom is not normal,
    // maybe it is because the keyboard is showed, don't use this insets
    isAndroid && insets.bottom >= 100 ? 0 : insets.bottom;

  const containerStyle = React.useMemo(
    () => [
      styles.container,
      {
        backgroundColor: opacity10(themeColor),
        paddingBottom: insetsBottom || 15,
      },
    ],
    [insetsBottom, themeColor]
  );

  // hide this bar when it is android and keyboard is shown
  if (isAndroid && keyboardShown) return null;

  return (
    <View style={containerStyle}>
      <ClassicProgressBar
        value={numValidFeedbacks(feedbackState)}
        maxValue={numTotalQuestions(props.survey)}
        themeColor={themeColor}
        rtl={rtl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    width: '100%',
  },
});

export default React.memo(SurveyProgressBar);
