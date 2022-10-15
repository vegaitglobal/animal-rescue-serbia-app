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
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View style={styles.topIconContainer}>{icon}</View>
            <Pressable onPress={onPress} style={styles.pressableContainer}>
              <Close width={30} height={30} />
            </Pressable>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
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

  topIconContainer: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
  header: {
    zIndex: 2,
    justifyContent: 'flex-end',
  },
  pressableContainer: {
    alignSelf: 'flex-end',
  },
});
