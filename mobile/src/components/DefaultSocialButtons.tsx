import React from 'react';
import {Linking, StyleProp, ViewStyle} from 'react-native';
import {IconData, SocialButtons, SocialButtonsProps} from './SocialButtons';
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';
import Globe from '../assets/icons/globe.svg';
import Envelope from '../assets/icons/envelope.svg';

type SocialIconType = 'instagram' | 'facebook' | 'website' | 'email';

type BubbleSizeType = Pick<SocialButtonsProps<T>, 'bubbleSize'>;
type DefaultSocialButtonsProps = BubbleSizeType & {
  style?: StyleProp<ViewStyle>;
  addEmail?: boolean;
};

export const DefaultSocialButtons = ({
  bubbleSize,
  style,
  addEmail,
}: DefaultSocialButtonsProps) => {
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
      case 'email': {
        Linking.openURL('mailto:info@animalrescueserbia.org');
        return;
      }
      case 'website':
      default: {
        Linking.openURL('https://www.animalrescueserbia.org/');
        return;
      }
    }
  };

  const baseDataSet: IconData<SocialIconType>[] = [
    {id: 'instagram', icon: <Instagram />},
    {id: 'facebook', icon: <Facebook />},
    {id: 'website', icon: <Globe />},
  ];

  const dynamicDataSet: IconData<SocialIconType>[] = addEmail
    ? [...baseDataSet, {id: 'email', icon: <Envelope width={20} height={20} />}]
    : baseDataSet;

  return (
    <SocialButtons
      bubbleSize={bubbleSize ?? 30}
      icons={dynamicDataSet}
      onPress={handleSocialIconPress}
      style={style}
    />
  );
};
