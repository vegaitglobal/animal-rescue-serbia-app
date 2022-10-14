import React, {ReactElement, ReactNode} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import Close from '../assets/icons/close.svg';

type CustomModalProps = {
  visible: boolean;
  title?: string;
  text?: string;
  children?: ReactNode;
  onPress: () => void;
  icon?: ReactElement;
};
export const CustomModal = ({
  visible,
  title,
  text,
  onPress,
  icon,
}: CustomModalProps) => {
  return (
    <Modal transparent visible={visible} statusBarTranslucent={true}>
      <View style={styles.modalBg}>
        <View style={styles.topIconContainer}>{icon}</View>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Pressable onPress={onPress}>
              <Close width={30} height={30} />
            </Pressable>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: ColorPallet.yellow_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: ColorPallet.plainWhite,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
    alignSelf: 'center',
    fontWeight: '800',
  },
  text: {
    paddingTop: 20,
  },
  textContainer: {
    paddingTop: 40,
  },
  topIconContainer: {
    position: 'absolute',
    zIndex: 1,
    paddingBottom: 120,
  },
});
