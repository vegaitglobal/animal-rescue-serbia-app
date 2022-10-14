import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {BackButton} from './BackButton';
import {StripedBar} from './StripedBar';
import Logo from '../assets/icons/megaphoneLogo.svg';

type ScreenRootContainerProps = {
  title: string;
  children: ReactNode;
  showLogo?: boolean;
};

export const ScreenRootContainer = ({
  children,
  title,
  showLogo,
}: ScreenRootContainerProps) => {
  const navigation = useNavigation();

  const onBackPress = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.backButton}>
          <BackButton text="Nazad" onPress={onBackPress} />
        </View>
        <View style={styles.header}>
          <Text numberOfLines={2} style={styles.headerText}>
            {title}
          </Text>
        </View>
      </View>
      <View style={styles.stripedBarContainer}>
        {showLogo ? (
          <View style={styles.headerLogoContainer}>
            <Logo width={64} height={64} />
          </View>
        ) : null}
        <StripedBar />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: ColorPallet.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 33,
    textTransform: 'uppercase',
    color: ColorPallet.plainWhite,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
  },
  headerContainer: {
    height: 150,
  },
  headerLogoContainer: {
    position: 'absolute',
    zIndex: 1,
    transform: [{translateY: -24}],
  },
  stripedBarContainer: {
    alignItems: 'center',
  },
});
