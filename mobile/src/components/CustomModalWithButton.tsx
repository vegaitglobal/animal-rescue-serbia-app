import React, {ReactElement, ReactNode, useMemo} from 'react';
import {
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {CustomButton} from './CustomButton';
import {StripedBar} from './StripedBar';

type CustomModalWithButtonProps = {
  visible: boolean;
  title?: string;
  text?: string;
  children?: ReactNode;
  icon?: ReactElement;
  buttonPositive: string;
  buttonNegative?: string;
  onPressPositiveBtn: () => void;
  onPressNegativeBtn?: () => void;
  isOneButtonModal?: boolean;
};
export const CustomModalWithButton = ({
  visible,
  text,
  buttonPositive,
  buttonNegative,
  onPressPositiveBtn,
  onPressNegativeBtn,
  isOneButtonModal,
  title,
}: CustomModalWithButtonProps) => {
  const dynamicStyle = useMemo(
    () => ({
      bgColor: {
        backgroundColor: isOneButtonModal
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
      buttonsContainer: {
        justifyContent: isOneButtonModal ? 'center' : 'space-between',
      },
    }),
    [isOneButtonModal],
  );

  return (
    <Modal transparent visible={visible} statusBarTranslucent={true}>
      <View style={[styles.modalBg, dynamicStyle.bgColor]}>
        <View style={[styles.modalContainer, dynamicStyle.containerColor]}>
          {isOneButtonModal && <StripedBar />}

          <View style={dynamicStyle.textContainer}>
            {isOneButtonModal && <Text style={styles.title}>{title}</Text>}
            <Text style={styles.text}>{text}</Text>
            <View
              style={[
                styles.buttonsContainer,
                dynamicStyle.buttonsContainer as StyleProp<ViewStyle>,
              ]}>
              <CustomButton
                textStyle={styles.textStyle}
                onPress={onPressPositiveBtn}
                text={buttonPositive}
                isSmall={true}
                style={styles.buttonStyle}
              />
              {!isOneButtonModal && (
                <CustomButton
                  textStyle={styles.textStyle}
                  onPress={onPressNegativeBtn!}
                  text={buttonNegative}
                  isSmall={true}
                  style={styles.buttonStyle}
                />
              )}
            </View>
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
  text: {
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
  buttonStyle: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 30,
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '800',
    paddingBottom: 15,
  },
});
