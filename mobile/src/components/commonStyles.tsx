import {StyleSheet} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

export const commonStyles = StyleSheet.create({
  inputField: {
    borderBottomWidth: 3,
    borderBottomColor: ColorPallet.mediumGray,
    color: ColorPallet.plainBlack,
    textAlign: 'center',
  },
});
