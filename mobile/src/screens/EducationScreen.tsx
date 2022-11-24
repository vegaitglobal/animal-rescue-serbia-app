import React from 'react';
import {Image, Text, View} from 'react-native';
import {ScreenRootContainer} from '../components/ScreenRootContainer';

export const EducationScreen = () => {
  return (
    <ScreenRootContainer title="Edukacija">
      <View style={{padding: 20}}>
        <Text style={{fontSize: 20, fontWeight: '800'}}>Primer bloga</Text>
        <Image
          style={{width: '100%', minHeight: 400}}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516__340.jpg',
          }}
        />
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae
          dignissimos quasi aliquid ea minus officia architecto incidunt
          corporis unde nemo quam deleniti, natus, beatae voluptates, eveniet ab
          quo eligendi quisquam?
        </Text>
      </View>
    </ScreenRootContainer>
  );
};
