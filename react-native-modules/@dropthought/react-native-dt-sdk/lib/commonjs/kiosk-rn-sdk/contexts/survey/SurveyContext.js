"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurveyContextProvider = exports.useSurvey = exports.useSurveyContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _ramda = require("ramda");

var _reactAsync = require("react-async");

var _reactNativeUi = require("@dropthought/react-native-ui");

var _theme = require("@dropthought/react-native-ui/src/contexts/theme");

var _FakeScreen = _interopRequireDefault(require("../../screens/FakeScreen"));

var _Storage = require("../../../lib/Storage");

var _API = require("../../../lib/API");

var _Fetcher = require("../../../lib/Fetcher");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @description
 * survey context expose two data: survey and changeLanguage function
 * it only renders children when survey is available,
 * therefore, the children would always be sure to have "survey" in context
 */
const DT_ERR_MISSING_PARAMS = 'dt-missing-parameters';
const DT_ERR_NO_BIND_PROGRAM = 'dt-no-bind-program';
/** @type {React.Context<SurveyContextValue>} */

const SurveyContext = /*#__PURE__*/React.createContext({
  survey: undefined,
  changeLanguage: () => undefined
});

const useSurveyContext = () => {
  return React.useContext(SurveyContext);
};

exports.useSurveyContext = useSurveyContext;

const useSurvey = () => {
  const surveyContextValue = React.useContext(SurveyContext);
  return surveyContextValue.survey;
};
/**
 * load the visibility data from cache or api
 * @param {{visibilityId: string, language: string, timezone: string}} param0
 */


exports.useSurvey = useSurvey;

const getVisibility = async ({
  visibilityId,
  language,
  timezone
}) => {
  if (!visibilityId) {
    throw new Error(DT_ERR_MISSING_PARAMS);
  }
  /** @type {Visibility} */


  const visibility = await (0, _API.apiGetVisibilityById)(visibilityId, {
    timeout: 10000
  });

  if (!visibility.program || !visibility.program.programId) {
    throw new Error(DT_ERR_NO_BIND_PROGRAM);
  }
  /** @type {ThemeData} */


  const theme = {
    themeOption: visibility.themeOption,
    appearance: visibility.appearance,
    fontColor: visibility.fontColor,
    backgroundColor: visibility.backgroundColor
  };
  return getProgram({
    surveyId: visibility.program.programId,
    language,
    timezone,
    theme
  });
};
/**
 * pre-fetch survey's image, get the width and height of the survey image
 * @param {Survey} survey
 * @return {Promise<Survey>}
 */


const preFetchImage = survey => new Promise(resolve => {
  const {
    image: uri,
    width,
    height
  } = (survey === null || survey === void 0 ? void 0 : survey.surveyProperty) || {};

  if (!uri || typeof uri !== 'string') {
    resolve(survey);
    return;
  } // pre-fetch the uri if it is not base64


  const base64Reg = /^data:image\/.+;base64/;

  if (!uri.match(base64Reg)) {
    _reactNative.Image.prefetch(uri);
  } // if height and width already existed


  if (width && height) {
    resolve(survey);
    return;
  } // get image's width and height


  _reactNative.Image.getSize(uri, (w, h) => {
    // resolve the updated survey with surveyProperty merge with {width, height}
    resolve((0, _ramda.evolve)({
      surveyProperty: (0, _ramda.merge)({
        width: w,
        height: h
      })
    })(survey));
  }, () => {
    resolve(survey);
  });
});
/**
 * load the program data from cache or api
 * @param {{surveyId: string, language: string, timezone?: string, theme?: ThemeData }} param0
 */


const getProgram = async ({
  surveyId,
  language,
  timezone,
  theme
}) => {
  const programCacheKey = `survey-${surveyId}-${language}`;

  if (!surveyId) {
    throw new Error(DT_ERR_MISSING_PARAMS);
  }
  /** @type {Survey} */


  let survey = await (0, _Storage.loadCache)(programCacheKey);

  if (!survey) {
    survey = await (0, _API.apiGetProgramById)({
      programId: surveyId,
      language,
      timezone
    }, {
      timeout: 10000
    });
  } // pre-fetch image


  survey = await preFetchImage(survey); // only save to cache when state is active

  if (survey.state === 'active') {
    await (0, _Storage.saveCache)(programCacheKey, survey);
  } // change the i18n language


  _reactNativeUi.i18n.changeLanguage(survey.language);

  return {
    survey,
    theme
  };
};
/**
 * extract questions in page and make them as its' independent page
 * @param {Survey} survey
 */


const singleQuestionPerPageTransformer = survey => {
  /** @type {Survey} */
  let result = {};

  if (survey) {
    const newPageOrder = [];
    const newPages = [];
    const {
      pages
    } = survey;
    pages.map(page => {
      const {
        pageId,
        questions
      } = page;
      questions.forEach((question, index) => {
        const newPageId = `${pageId}_${index}`;
        newPageOrder.push(newPageId);
        const newPage = { ...page,
          pageId: newPageId,
          questions: [question]
        };
        newPages.push(newPage);
      });
    });
    result = { ...survey,
      pageOrder: newPageOrder,
      pages: newPages
    };
  }

  return result;
}; // we want to "remember" the previous selected language
// so that, later when there's error, we could fallback to the previous selected language


const useSelectedLanguageState = defaultLanguage => {
  const [selectedLanguage, setSelectedLanguage] = React.useState(defaultLanguage);
  const prevSelectedLanguage = React.useRef(); // backup the previous selected language

  const setSelectedLanguageWithBackup = React.useCallback(languageToSet => {
    prevSelectedLanguage.current = selectedLanguage;
    setSelectedLanguage(languageToSet);
  }, [selectedLanguage]);
  return [selectedLanguage, prevSelectedLanguage.current, setSelectedLanguageWithBackup, setSelectedLanguage];
};

const showAlert = () => {
  const title = 'Unable to fetch data';
  const message = 'Please check if you are connected to the internet'; // @TODO: SurveyNativeBridge

  _reactNative.Alert.alert(title, message, [{
    text: 'OK'
  }]);
};

const defaultOnCloseHandler = () => {
  console.log('please provide your own onClose function when using SDKEntry');
};
/**
 * @param {Props} param0
 */


const SurveyContextProvider = ({
  baseURL,
  apiKey,
  visibilityId,
  surveyId,
  children,
  defaultLanguage = 'en',
  onClose = defaultOnCloseHandler,
  themeOption,
  appearance,
  fontColor,
  backgroundColor,
  timezone
}) => {
  if (baseURL || apiKey) {
    _API.sdkFetcher.init({
      baseURL,
      apiKey
    });
  }

  const themeDataFromSDKEntry = {
    themeOption,
    appearance: _reactNative.Appearance.getColorScheme() === 'dark' ? 'dark' : appearance,
    fontColor,
    backgroundColor
  };
  const [selectedLanguage, prevSelectedLanguage, setSelectedLanguageWithBackup, setSelectedLanguage] = useSelectedLanguageState(defaultLanguage); // handler the rejection when switching language

  const onRejectHandler = React.useCallback(() => {
    if (!(0, _ramda.isNil)(prevSelectedLanguage) && prevSelectedLanguage !== selectedLanguage) {
      // fallback to previous language directly
      setSelectedLanguage(prevSelectedLanguage);
      showAlert();
    }
  }, [selectedLanguage, prevSelectedLanguage, setSelectedLanguage]);
  const {
    data,
    error,
    isPending
  } = (0, _reactAsync.useAsync)({
    promiseFn: visibilityId ? getVisibility : getProgram,
    onReject: onRejectHandler,
    visibilityId,
    surveyId,
    language: selectedLanguage,
    timezone,
    // watch, only re-run the promise, when language is changed or visibilityId is changed
    watchFn: (props, prevProps) => props.visibilityId !== prevProps.visibilityId || props.language !== prevProps.language && props.language !== prevSelectedLanguage || props.surveyId !== prevProps.surveyId
  });
  const {
    survey,
    theme = themeDataFromSDKEntry
  } = data !== null && data !== void 0 ? data : {};
  /** @type {SurveyContextValue} */

  const contextValue = React.useMemo(() => ({
    onClose,
    survey: (theme === null || theme === void 0 ? void 0 : theme.themeOption) === _reactNativeUi.THEME_OPTION.CLASSIC ? survey : singleQuestionPerPageTransformer(survey),
    changeLanguage: setSelectedLanguageWithBackup
  }), [survey, onClose, setSelectedLanguageWithBackup, theme]); // initial loading data view

  if (!data) {
    // loading
    let content = /*#__PURE__*/React.createElement(_reactNative.View, {
      style: _reactNativeUi.GlobalStyle.fullCenter
    }, /*#__PURE__*/React.createElement(_reactNative.ActivityIndicator, {
      size: "large"
    }));

    if (error) {
      let placeholderProps = {
        imageType: _reactNativeUi.PlaceholderImageTypes.ProgramUnavailable,
        message: 'Sorry for the inconvenience.\nPlease come back and check later on.'
      };

      if ((0, _Fetcher.isRequestTimeoutError)(error) || (0, _Fetcher.isNoInternetError)(error)) {
        placeholderProps = {
          imageType: _reactNativeUi.PlaceholderImageTypes.NoInternet,
          message: 'Please check if you are connected to the internet'
        };
      }

      content = /*#__PURE__*/React.createElement(_reactNativeUi.PlaceholderScreen, placeholderProps);
    }

    return /*#__PURE__*/React.createElement(_FakeScreen.default, {
      onClose: onClose
    }, content);
  }

  return /*#__PURE__*/React.createElement(SurveyContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(_theme.ThemeProvider, theme, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _reactNativeUi.GlobalStyle.flex1
  }, children, /*#__PURE__*/React.createElement(_reactNativeUi.ActivityIndicatorMask, {
    loading: isPending
  }))));
};
/** @typedef {import('../../SDKEntry').SDKEntryProps} Props */

/**
 * @typedef {object} SurveyContextValue
 * @property {Survey} survey
 * @property {(language: string) => void} changeLanguage
 * @property {() => void} onClose
 */

/** @typedef {import('../../../data').Survey} Survey */

/** @typedef {import('../../../data').Visibility} Visibility */

/** @typedef {import('../../../data').ThemeData} ThemeData */


exports.SurveyContextProvider = SurveyContextProvider;
//# sourceMappingURL=SurveyContext.js.map