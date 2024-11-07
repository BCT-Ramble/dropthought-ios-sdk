// @ts-check
import { Alert } from 'react-native';
import { isEmpty } from 'ramda';
export const fileUploadValidator = (question, feedback, scheme) => {
  var _feedback$answers, _feedback$answers2;
  const {
    mandatory
  } = question;
  //@ts-ignore
  const isAllFileUploadSuccessful = feedback === null || feedback === void 0 || (_feedback$answers = feedback.answers) === null || _feedback$answers === void 0 ? void 0 : _feedback$answers.every(
  //@ts-ignore
  selectedFile => selectedFile.file.length > 0);
  if ((feedback === null || feedback === void 0 || (_feedback$answers2 = feedback.answers) === null || _feedback$answers2 === void 0 ? void 0 : _feedback$answers2.length) > 0 && !isAllFileUploadSuccessful) {
    Alert.alert('File Upload in progress', 'Please wait while your file is being uploaded. You cannot proceed to the previous/next step until the upload is complete.', [{
      text: 'Okay',
      style: 'cancel'
    }], {
      userInterfaceStyle: scheme
    });
    return false;
  } else {
    var _feedback$answers3;
    return (feedback === null || feedback === void 0 || (_feedback$answers3 = feedback.answers) === null || _feedback$answers3 === void 0 ? void 0 : _feedback$answers3.length) > 0 && !isEmpty(feedback.answers[0]) || !mandatory;
  }
};
export default fileUploadValidator;

/**
 * @typedef {import('../DropThought').Question} Question
 * @typedef {import('../FeedbacksUploader').Feedback} Feedback
 */
//# sourceMappingURL=fileUploadValidator.js.map