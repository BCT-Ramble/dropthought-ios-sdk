import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import GlobalStyle, { Colors } from '../styles';
import { useTheme } from '../contexts/theme';
import type { Question, Feedback } from '../data';
import OpenURLButton from './OpenURLButton';
import ActivityIndicatorMask from './ActivityIndicatorMask';
import i18n from '../translation';
import useStateRef from '../hooks/useStateRef';
import { getImageSize } from '../utils/data';

type Props = {
  question: Question;
  onFeedback: (feedback: Feedback) => void;
};

const RELOAD_TIMEOUT = 30 * 1000;
const MAX_IMAGE_HEIGHT = 445;
const questionContainerWidth = Dimensions.get('window').width * 0.8;

const getImageExtension = (url?: string) => {
  return url?.split('.').pop() || '';
};

const StatementQuestion = ({ question, onFeedback }: Props) => {
  const { questionTitlePlain, statementProperty, questionId } = question;
  const { fontColor } = useTheme();
  const { addImage, addUrl, url = '', logo } = statementProperty;
  const rtl = i18n.dir() === 'rtl';

  const [size, setSize] = useState({
    width: questionContainerWidth,
    height: MAX_IMAGE_HEIGHT,
  });

  const [loadingImage, setLoadingImage, loadingImageRef] = useStateRef(true);
  const [imageLoadError, setImageLoadError, imageLoadErrorRef] =
    useStateRef(false);

  const fetchImageSize = useCallback(
    /**
     * @param {string} uri
     */
    (uri) => {
      getImageSize(uri).then((imageSize) => {
        const ratio = Math.min(
          questionContainerWidth / imageSize.width,
          MAX_IMAGE_HEIGHT / imageSize.height,
          1
        );
        setSize({
          width: imageSize.width * ratio,
          height: imageSize.height * ratio,
        });
      });
    },
    []
  );

  useEffect(() => {
    if (logo && getImageExtension(logo) !== 'svg') {
      fetchImageSize(logo);
    }

    // this feedback means user has read it.
    onFeedback({
      questionId,
      answers: [''],
      type: 'statement',
    });
  }, [fetchImageSize, logo, onFeedback, questionId]);

  const descriptionStyle = [
    styles.description,
    rtl && GlobalStyle.textAlignRight,
    {
      color: fontColor,
    },
  ];

  //@ts-ignore
  const earthIcon = <Image source={require('../assets/ic-earth.png')} />;
  const urlComponent = addUrl ? (
    <View style={[styles.urlContainer, rtl && GlobalStyle.flexRowReverse]}>
      {earthIcon}
      <OpenURLButton url={url} />
    </View>
  ) : null;

  const triggerReload = useCallback(() => {
    if (logo && getImageExtension(logo) !== 'svg') {
      fetchImageSize(logo);
    }
    setImageLoadError(false);
    setLoadingImage(true);
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        if (!imageLoadErrorRef.current && loadingImageRef.current) {
          setImageLoadError(true);
          setLoadingImage(false);
        }
      }, RELOAD_TIMEOUT);
    }
  }, [
    fetchImageSize,
    imageLoadErrorRef,
    loadingImageRef,
    logo,
    setImageLoadError,
    setLoadingImage,
  ]);

  const reloadTextStyle = [
    styles.reloadText,
    {
      color: fontColor,
    },
  ];

  const imageComponent = () => {
    if (addImage) {
      if (imageLoadError) {
        return (
          <TouchableOpacity
            style={styles.reloadContainer}
            onPress={triggerReload}
          >
            <Image source={require('../assets/ic_image_placeholder.png')} />
            <View style={GlobalStyle.row}>
              <Image
                source={require('../assets/ic_reload.png')}
                tintColor={fontColor}
              />
              <Text style={reloadTextStyle}>
                {`${i18n.t('picture-choice:reload')}`}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <View style={styles.imageContainer}>
            {getImageExtension(logo) === 'svg' ? (
              <SvgUri
                width="100%"
                height={MAX_IMAGE_HEIGHT}
                uri={logo || ''}
                onLoad={() => {
                  setLoadingImage(false);
                }}
              />
            ) : (
              <Image
                style={[styles.image, size]}
                source={{
                  uri: logo,
                }}
                onLoadStart={() => setLoadingImage(true)}
                onLoadEnd={() => setLoadingImage(false)}
                onError={(_) => {
                  setImageLoadError(true);
                  setLoadingImage(false);
                }}
              />
            )}

            <ActivityIndicatorMask loading={loadingImage} />
          </View>
        );
      }
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {imageComponent()}
        <Text style={descriptionStyle}>{questionTitlePlain}</Text>
        {urlComponent}
      </View>
    </ScrollView>
  );
};

export default React.memo(StatementQuestion);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    ...GlobalStyle.flex1,
  },
  content: {
    gap: 20,
  },
  image: {
    width: '100%',
    height: MAX_IMAGE_HEIGHT,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  urlContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  reloadContainer: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.rankingBorder,
    paddingVertical: 36,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 22,
  },
  reloadText: {
    fontSize: 14,
    marginLeft: 6,
  },
});
