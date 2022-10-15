import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import Report from '../assets/icons/educationGrayBg.svg';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {getNewReport} from '../store/src/reports/selectors';

export const ReportScreen = () => {
  const {firstName, lastName} = useAppSelector(getNewReport);
  const dispatch = useAppDispatch();

  const headerTitle = 'Prijava prekršaja';
  const text = 'Lorem ipsum';

  const [visible, setVisible] = useState(false);

  useEffect(() => setVisible(true), []);

  return (
    <ScreenRootContainer title={headerTitle} showLogo>
      <View style={style.container}></View>
      <CustomModal
        title={headerTitle}
        text={text}
        icon={<Report width={100} height={100} />}
        onPress={() => setVisible(false)}
        visible={visible}
      />
    </ScreenRootContainer>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: ColorPallet.plainWhite,
    flex: 1,
  },
});
