import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import {LiteViolationList} from './components/LiteViolationList';
import {Chevron, Orientation} from '../components/Chevron';
import {FullViolationList} from './components/FullViolationList';
import {SelectionModal} from '../components/SelectionModal';

export const ViolationsScreen = () => {
  const [isApprovedViolationList, setIsApprovedViolationList] = useState(true);

  const renderListHeader = () => (
    <View
      style={{
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 35,
        backgroundColor: ColorPallet.gray,
      }}>
      <View
        style={{
          paddingBottom: 4,
          borderBottomWidth: 2,
          borderBottomColor: ColorPallet.plainWhite,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            height: 20,
            //backgroundColor: 'yellow',
            color: ColorPallet.plainWhite,
            //flex: 1,
          }}>
          Text
        </Text>
        <Chevron
          orientation={Orientation.Down}
          color={ColorPallet.plainWhite}
        />
      </View>
    </View>
  );

  return (
    <ScreenRootContainer title="Prekršaji" showLogo>
      {!isApprovedViolationList ? (
        <FullViolationList renderListHeader={renderListHeader} />
      ) : (
        <LiteViolationList renderHeaderComponent={renderListHeader} />
      )}
      {/* <SelectionModal
        data={[
          {id: 'full', label: 'Odobrene prijave'},
          {id: 'lite', label: 'Nepregledane prijave'},
        ]} */}

      {/* /> */}
    </ScreenRootContainer>
  );
};
