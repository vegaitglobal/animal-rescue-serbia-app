import React from 'react';
import {Linking, StyleProp, ViewStyle} from 'react-native';
import {SocialButtons, SocialButtonsProps} from './SocialButtons';
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';
import Globe from '../assets/icons/globe.svg';

type SocialIconType = 'instagram' | 'facebook' | 'website';

type BubbleSizeType = Pick<SocialButtonsProps<T>, 'bubbleSize'>;
type DefaultSocialButtonsPRops = BubbleSizeType & {
  style: StyleProp<ViewStyle>;
};

export const DefaultSocialButtons = ({
  bubbleSize,
  style,
}: DefaultSocialButtonsPRops) => {
  const handleSocialIconPress = (id: SocialIconType) => {
    switch (id) {
      case 'instagram': {
        Linking.openURL('https://www.instagram.com/animal_rescue_serbia');
        return;
      }
      case 'facebook': {
        Linking.openURL('https://www.facebook.com/animalrescueserbia/');
        return;
      }
      case 'website':
      default: {
        Linking.openURL('https://www.animalrescueserbia.org/');
      }
    }
  };

  return (
    <SocialButtons
      bubbleSize={bubbleSize ?? 30}
      icons={[
        {id: 'instagram', icon: <Instagram />},
        {id: 'facebook', icon: <Facebook />},
        {id: 'website', icon: <Globe />},
      ]}
      onPress={handleSocialIconPress}
      style={style}
    />
  );
};
