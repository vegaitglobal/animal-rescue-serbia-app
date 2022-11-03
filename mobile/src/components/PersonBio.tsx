import React from 'react';
import {Text, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

type PersonBioProps = {
  fullName: string;
  bio: string;
};

export const PersonBio = ({fullName, bio}: PersonBioProps) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontWeight: '800', color: ColorPallet.plainBlack}}>
        {fullName}
      </Text>
      <Text style={{textAlign: 'center', color: ColorPallet.plainBlack}}>
        {bio}
      </Text>
    </View>
  );
};
