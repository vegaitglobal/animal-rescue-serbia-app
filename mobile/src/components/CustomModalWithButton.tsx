import React, {ReactElement, ReactNode, useMemo} from 'react';
import {Modal, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {CustomButton} from './CustomButton';
import {EmptySpace} from './EmptySpace';
import {StripedBar} from './StripedBar';

type CustomModalWithButtonProps = {
  visible: boolean;
  title?: string;
  message?: string;
  children?: ReactNode;
  icon?: ReactElement;
  buttonPositive: string;
  buttonNegative?: string;
  onPressPositiveBtn: () => void;
  onPressNegativeBtn?: () => void;
  isOneButtonModal?: boolean;
  middleButtonLabel?: string;
  onMiddleButtonPress?: () => void;
  buttonStyle?: ViewStyle;
};
export const CustomModalWithButton = ({
  visible,
  message,
  buttonPositive,
  buttonNegative,
  onPressPositiveBtn,
  onPressNegativeBtn,
  isOneButtonModal,
  title,
  onMiddleButtonPress,
  middleButtonLabel,
  buttonStyle,
}: CustomModalWithButtonProps) => {
  const dynamicStyle = useMemo(
    () => ({
      bgColor: {
        backgroundColor: isOneButtonModal //TODONF: get rid of this one button concept
          ? ColorPallet.yellow_20
          : ColorPallet.black_20,
      },
      containerColor: {
        backgroundColor: isOneButtonModal
          ? ColorPallet.plainWhite
          : ColorPallet.yellow,
        borderRadius: isOneButtonModal ? 0 : 20,
        paddingHorizontal: isOneButtonModal ? 0 : 10,
        paddingTop: isOneButtonModal ? 0 : 40,
      },
      textContainer: {
        paddingTop: isOneButtonModal ? 40 : 0,
        paddingHorizontal: isOneButtonModal ? 10 : 0,
      },
    }),
    [isOneButtonModal],
  );

  return (
    <Modal transparent visible={visible} statusBarTranslucent={true}>
      <View style={[styles.modalBg, dynamicStyle.bgColor]}>
        <View
          style={[
            styles.modalContainer,
            dynamicStyle.containerColor,
            {
              borderRadius: 20,
              overflow: 'hidden',
              borderColor: ColorPallet.lightGray,
              borderWidth: 1,
              height: '30%',
            },
          ]}>
          {isOneButtonModal && <StripedBar />}

          <View style={dynamicStyle.textContainer}>
            {isOneButtonModal && <Text style={styles.title}>{title}</Text>}
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={{flex: 1}} />
          <View style={styles.buttonsContainer}>
            {!isOneButtonModal && (
              <>
                <CustomButton
                  textStyle={styles.textStyle}
                  onPress={onPressNegativeBtn!}
                  text={buttonNegative}
                  isSmall={true}
                  style={styles.buttonStyle}
                />
                <EmptySpace width={10} />
              </>
            )}
            {middleButtonLabel && (
              <>
                <CustomButton
                  textStyle={styles.textStyle}
                  onPress={onMiddleButtonPress}
                  text={middleButtonLabel}
                  isSmall={true}
                  style={styles.buttonStyle}
                />
                <EmptySpace width={10} />
              </>
            )}
            <CustomButton
              textStyle={styles.textStyle}
              onPress={onPressPositiveBtn}
              text={buttonPositive}
              isSmall={true}
              style={[styles.buttonStyle, styles.primaryButton, buttonStyle]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    paddingHorizontal: 10,
    paddingTop: 40,
    borderRadius: 20,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  message: {
    fontSize: 16,
    alignSelf: 'center',
  },
  textContainer: {
    paddingTop: 40,
  },
  topIconContainer: {
    position: 'absolute',
    zIndex: 1,
    paddingBottom: 120,
  },
  primaryButton: {
    backgroundColor: ColorPallet.yellow_20,
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    flex: 1,
  },
  buttonsContainer: {
    paddingBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  textStyle: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    textTransform: 'uppercase',
    paddingBottom: 15,
    fontWeight: 'bold',
  },
});
