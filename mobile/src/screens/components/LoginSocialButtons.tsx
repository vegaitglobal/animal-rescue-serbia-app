import React from 'react';
import {Linking} from 'react-native';
import {SocialButtons} from '../../components/SocialButtons';
import Viber from '../../assets/icons/viber.svg';
import Facebook from '../../assets/icons/facebook.svg';
import Instagram from '../../assets/icons/instagram.svg';

type IconType = 'viber' | 'instagram' | 'facebook';

export const LoginSocialButtons = () => {
  const viberNumber = '+38164 8210200'; //TODO: Extract settings like this into constants/settings object accessible globally
  const onPress = (id: IconType) => {
    switch (id) {
      case 'viber': {
        Linking.openURL(`https://viber.com/contact?number=${viberNumber}`);
        return;
      }
      case 'facebook': {
        Linking.openURL('https://www.facebook.com/animalrescueserbia/');
        return;
      }
      default:
      case 'instagram': {
        Linking.openURL('https://www.instagram.com/animal_rescue_serbia');
        return;
      }
    }
  };

  return (
    <SocialButtons
      onPress={onPress}
      icons={[
        {id: 'viber', icon: <Viber width={35} height={35} />},
        {id: 'facebook', icon: <Facebook />},
        {id: 'instagram', icon: <Instagram />},
      ]}
    />
  );
};
