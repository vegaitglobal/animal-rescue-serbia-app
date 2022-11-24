import React, {ReactElement, useState} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Image, ImageProps, StyleSheet, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {bind} from '../util/helpers';

type ImageWithLoadingAnimationProps = {
  width: number;
  height: number;
  overlayIcon?: ReactElement;
} & ImageProps;

export const ImageWithLoadingAnimation = ({
  width = 50,
  height = 50,
  overlayIcon,
  ...imageProps
}: ImageWithLoadingAnimationProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View>
      {/*@ts-ignore */}
      {isLoading || !imageProps?.source?.uri ? (
        <View style={styles.loadingAnimationElement}>
          <ContentLoader
            viewBox={`0 0 ${width} ${height}`}
            backgroundColor={ColorPallet.loadingBackground}
            foregroundColor={ColorPallet.loadingForeground}>
            <Rect width={width} height={height} />
          </ContentLoader>
        </View>
      ) : null}
      <View style={styles.overlayIconContainer}>{overlayIcon}</View>
      <Image
        {...imageProps}
        source={imageProps.source}
        style={{width, height}}
        onLoadStart={bind(true, setIsLoading)}
        onLoadEnd={bind(false, setIsLoading)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingAnimationElement: {
    position: 'absolute',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    start: 0,
    top: 0,
    bottom: 0,
    end: 0,
  },
  overlayIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
