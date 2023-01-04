import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors, GlobalStyle } from '../styles';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import type { Survey } from '../data';
// @ts-ignore
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const iconSource = {
  [COLOR_SCHEMES.light]: require('../assets/rating.png'),
  [COLOR_SCHEMES.dark]: require('../assets/rating_dark.png'),
};

const logoSource = {
  [COLOR_SCHEMES.light]: require('../assets/ic_dtlogo.png'),
  [COLOR_SCHEMES.dark]: require('../assets/ic_dtlogo_dark.png'),
};

type Props = {
  survey: Survey;
  onClose: () => void;
};

const EndScreen = ({ survey, onClose }: Props) => {
  const insets = useSafeAreaInsets();
  const { colorScheme, fontColor, backgroundColor } = useTheme();
  const rtl = i18n.dir() === 'rtl';

  const { thankYouText } = survey;

  const powerByStyle = [styles.power_by, { color: fontColor }];
  const powerByBoldStyle = [styles.power_by_bold, { color: fontColor }];

  const containerStyle = [
    styles.headerContainer,
    { paddingTop: insets.top },
    rtl && GlobalStyle.flexRowReverse,
    {
      backgroundColor,
    },
  ];
  const titleStyle = [styles.headerTitle, { color: fontColor }];
  const headerIconStyle = { tintColor: survey.surveyProperty.hexCode };
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={containerStyle}>
        <View style={styles.headerRowContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              style={headerIconStyle}
              source={require('../assets/icClose24Px.png')}
            />
          </TouchableOpacity>
          <Text style={titleStyle} numberOfLines={1}>
            {survey.surveyName}
          </Text>
        </View>
      </View>
      <View style={styles.main}>
        {/* @ts-ignore */}
        <Image source={iconSource[colorScheme]} />
        <Text style={[styles.title, { color: fontColor }]}>
          {i18n.t('end-survey:thank')}
        </Text>
        <Text style={[styles.subtitle, { color: fontColor }]}>
          {thankYouText}
        </Text>
      </View>
      <View style={styles.vertical}>
        <View style={styles.horizontal}>
          <Text style={powerByStyle}>Powered by </Text>
          {/* @ts-ignore */}
          <Image style={styles.dtLogo} source={logoSource[colorScheme]} />
        </View>
        <Text style={powerByBoldStyle}>dropthought</Text>
      </View>
    </View>
  );
};

export default EndScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 38,
  },
  title: {
    lineHeight: 27,
    marginTop: 44,
    fontSize: 22,
    opacity: 0.8,
    fontWeight: '500',
  },
  subtitle: {
    lineHeight: 23,
    marginTop: 17,
    fontSize: 19,
    textAlign: 'center',
    opacity: 0.72,
  },
  vertical: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 83,
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  power_by: {
    fontSize: 12,
  },
  power_by_bold: {
    fontSize: 16,
    fontWeight: '600',
  },
  dtLogo: {
    height: 24,
    width: 24,
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  headerRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    marginTop: 17,
  },
  closeButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 30,
    textAlign: 'center',
    flexGrow: 1,
  },
});