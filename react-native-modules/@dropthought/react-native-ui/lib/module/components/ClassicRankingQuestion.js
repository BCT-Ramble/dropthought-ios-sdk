import React, { useEffect, useRef, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Modal, ScrollView, FlatList, ActionSheetIOS, Platform } from 'react-native';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import GlobalStyle, { Colors } from '../styles';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

const swapElements = (array, index1, index2) => {
  let newArray = [...array];
  newArray[index1] = newArray.splice(index2, 1, newArray[index1])[0];
  return newArray;
};

const ClassicRankingQuestion = ({
  question,
  onFeedback,
  feedback,
  forgot
}) => {
  const {
    fontColor,
    colorScheme
  } = useTheme();
  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const isiOS = Platform.OS === 'ios';
  const {
    questionId,
    options = [],
    allowNAForRanking = true
  } = question;
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const originListRef = useRef(options.map((value, index) => {
    return {
      option: value,
      index,
      isNA: false
    };
  }));
  const [list, setList] = useState(originListRef.current);
  useEffect(() => {
    const {
      listForRankingQuestion
    } = feedback !== null && feedback !== void 0 ? feedback : {};

    if (feedback && listForRankingQuestion && listForRankingQuestion.length > 0) {
      let feedbackToOptions = [];
      let feedbackToNAOptions = [];
      listForRankingQuestion.forEach(({
        option,
        isNA
      }, index) => {
        const newOption = {
          option,
          index,
          isNA
        };

        if (isNA) {
          feedbackToNAOptions = [...feedbackToNAOptions, newOption];
        } else {
          feedbackToOptions = [...feedbackToOptions, newOption];
        }
      });
      setList(listForRankingQuestion);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  useEffect(() => {
    /** @type {(number|string)[]} */
    const answers = list.map(({
      isNA,
      index
    }) => {
      return isNA ? 'N/A' : index;
    });
    const result = {
      questionId,
      answers,
      type: 'ranking',
      listForRankingQuestion: list // for render usage after page navigations

    }; // @ts-ignore

    onFeedback(result);
  }, [list, onFeedback, questionId]);

  const onNAPress = item => {
    if (list) {
      item.isNA = !item.isNA;
      setList(prev => {
        const withoutItem = prev.filter(current => current.option !== item.option);
        const normalList = withoutItem.filter(current => !current.isNA);
        const naList = withoutItem.filter(current => current.isNA);
        return item.isNA ? [...normalList, ...naList, item] : [...normalList, item, ...naList];
      });
    }
  };

  const renderItem = ({
    item,
    index = 0,
    drag
  }) => {
    const dragIconStyle = {
      opacity: item.isNA ? 0.3 : 1
    };
    const hitSlop = {
      top: 12,
      bottom: 12,
      left: 5,
      right: 5
    };
    const naComponent = allowNAForRanking ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
      style: styles.divider
    }), /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: GlobalStyle.row,
      hitSlop: hitSlop,
      onPress: () => onNAPress(item)
    }, item.isNA ? /*#__PURE__*/React.createElement(Image, {
      source: require('../assets/icCheckBox24Px.png')
    }) : /*#__PURE__*/React.createElement(View, {
      style: styles.unCheckBox
    }), /*#__PURE__*/React.createElement(Text, {
      style: [styles.naText, {
        color: fontColor
      }]
    }, 'N/A'))) : null;
    const rankText = item.isNA ? 'N/A' : `${index + 1}`;
    const renderItemStyle = colorScheme === COLOR_SCHEMES.dark ? {
      backgroundColor: Colors.rankingBGDark,
      borderColor: Colors.rankingBorderDark
    } : null;
    const rankingContainerStyle = colorScheme === COLOR_SCHEMES.dark ? {
      backgroundColor: Colors.rankingBGDark,
      borderColor: Colors.rankingBorderDark
    } : null;
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: [styles.renderItem, renderItemStyle],
      disabled: item.isNA,
      delayLongPress: 200,
      onLongPress: drag
    }, /*#__PURE__*/React.createElement(Image, {
      style: dragIconStyle,
      source: require('../assets/icDrag.png')
    }), /*#__PURE__*/React.createElement(Text, {
      style: [styles.rankTitle, {
        color: fontColor
      }],
      numberOfLines: 2
    }, item.option), /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: [styles.rankingContainer, rankingContainerStyle],
      hitSlop: hitSlop,
      disabled: item.isNA,
      onPress: () => {
        setSelectedOption(item);

        if (isPhone && isiOS) {
          oniOSModal(item);
        } else {
          setVisible(true);
        }
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.rankText, {
        color: fontColor
      }]
    }, rankText), /*#__PURE__*/React.createElement(Image // @ts-ignore
    , {
      source: require('../assets/ic-expand-more-24-px.png')
    })), naComponent);
  };

  const normalList = list.filter(current => !current.isNA);
  const naList = list.filter(current => current.isNA);

  const oniOSModal = selected => ActionSheetIOS.showActionSheetWithOptions({
    options: ['Cancel', ...normalList.map((_, index) => (index + 1).toString()), 'N/A'],
    cancelButtonIndex: 0,
    // @ts-ignore
    userInterfaceStyle: colorScheme
  }, buttonIndex => {
    if (buttonIndex === 0) return;
    const index = buttonIndex - 1;

    if (normalList.length + 1 === buttonIndex && selected) {
      onNAPress(selected);
    } else if (selected) {
      setList(prev => {
        // insert at index
        // let newList = prev.filter(
        //     ({option}) =>
        //         option !==
        //         selected?.option,
        // )
        // newList = [
        //     ...newList.slice(
        //         0,
        //         index,
        //     ),
        //     selected,
        //     ...newList.slice(index),
        // ]
        // swap
        const currentIndex = prev.findIndex(({
          option
        }) => option === selected.option);
        const newList = swapElements(prev, index, currentIndex);
        return newList;
      });
    }
  });

  const rankingModal = /*#__PURE__*/React.createElement(Modal, {
    transparent: true,
    animationType: "fade",
    visible: visible
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.modalBG
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.modalDismissArea,
    onPress: () => setVisible(false)
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.modalContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.modalTitle
  }, 'Select your rating'), normalList.map((_value, index) => {
    return /*#__PURE__*/React.createElement(View, {
      key: index
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.modalDivider
    }), /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: () => {
        if (selectedOption) {
          setList(prev => {
            // insert at index
            // let newList = prev.filter(
            //     ({option}) =>
            //         option !==
            //         selectedOption?.option,
            // )
            // newList = [
            //     ...newList.slice(
            //         0,
            //         index,
            //     ),
            //     selectedOption,
            //     ...newList.slice(index),
            // ]
            // swap
            const currentIndex = prev.findIndex(({
              option
            }) => option === selectedOption.option);
            const newList = swapElements(prev, index, currentIndex);
            return newList;
          });
          setVisible(false);
        }
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.modalTitle
    }, `${index + 1}`)));
  }), allowNAForRanking ? /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => {
      if (selectedOption) {
        onNAPress(selectedOption);
      }

      setVisible(false);
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.modalDivider
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.modalTitle
  }, 'N/A')) : null))));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ScrollView, {
    horizontal: true,
    scrollEnabled: false,
    contentContainerStyle: styles.scrollViewContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: [GlobalStyle.questionContainer, styles.questionContainer]
  }, /*#__PURE__*/React.createElement(ClassicMandatoryTitle, {
    forgot: forgot,
    question: question,
    style: styles.mandatoryTitle
  }), /*#__PURE__*/React.createElement(DraggableFlatList, {
    scrollEnabled: false,
    data: normalList,
    onDragEnd: ({
      data
    }) => {
      setList([...data, ...naList]);
    } // @ts-ignore
    ,
    renderItem: renderItem,
    keyExtractor: item => item.index.toString()
  }), /*#__PURE__*/React.createElement(FlatList, {
    scrollEnabled: false,
    data: naList // @ts-ignore
    ,
    renderItem: renderItem,
    keyExtractor: (_, index) => index.toString()
  })))), rankingModal);
};

export default /*#__PURE__*/React.memo(ClassicRankingQuestion);
const styles = StyleSheet.create({
  renderItem: { ...GlobalStyle.row,
    height: 48,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.rankingBorder,
    paddingHorizontal: 12,
    backgroundColor: Colors.rankingBG
  },
  rankTitle: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 15
  },
  rankingContainer: { ...GlobalStyle.row,
    width: 50,
    height: 24,
    borderRadius: 4,
    backgroundColor: Colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.rankingContainerBorder,
    paddingHorizontal: 7,
    justifyContent: 'space-between'
  },
  rankText: {
    fontSize: 15
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: Colors.rankingBorder,
    marginHorizontal: 16
  },
  naText: {
    fontSize: 13,
    marginLeft: 8
  },
  unCheckBox: {
    width: 16,
    height: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#a8a8a8'
  },
  modalBG: { ...GlobalStyle.row,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.24)'
  },
  modalContainer: {
    width: 268,
    backgroundColor: Colors.white,
    borderRadius: 14,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowRadius: 16,
    shadowOpacity: 1
  },
  modalTitle: {
    height: 24,
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500'
  },
  modalDivider: {
    backgroundColor: Colors.divider,
    height: 1
  },
  scrollViewContainer: {
    width: '100%',
    justifyContent: 'center'
  },
  mandatoryTitle: {
    marginBottom: 12
  },
  questionContainer: {
    width: '100%'
  },
  modalDismissArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
//# sourceMappingURL=ClassicRankingQuestion.js.map