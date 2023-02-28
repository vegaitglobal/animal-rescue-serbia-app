import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import Report from '../assets/icons/prijava.svg';
import Inform from '../assets/icons/informisanje.svg';
import Education from '../assets/icons/edukacija.svg';
import Ads from '../assets/icons/oglasavanje.svg';
import {CustomButton} from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {EmptySpace} from '../components/EmptySpace';
import {SquareGrid} from '../components/SquareGrid/SquareGrid';
import {GridIcon} from '../components/SquareGrid/GridIcon';
import Toast from 'react-native-toast-message';

export const HomeScreen = () => {
  const headerTitle = 'Prijavi';
  const ars = 'Animal Rescue Serbia';
  const donatori = 'Donatori i prijatelji';
  const doniranje = 'Doniraj';
  const prijava = 'Prijava ';
  const edukacija = 'Edukacija';
  const oglasavanje = 'Oglasavanje';
  const informisanje = 'Informisanje';
  const violationListButtonLabel = 'Lista prijava';

  const navigation = useNavigation();

  const onBoxIconPress = useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (rowIndex === 0) {
        if (columnIndex === 0) {
          navigation.navigate('Report');
          return;
        }

        navigation.navigate('Education');
        return;
      }

      if (columnIndex === 0) {
        Toast.show({
          type: 'info',
          text1: 'Oglašavanje trenutno nije u funkciji',
          position: 'bottom',
        });
        return;
      }
      navigation.navigate('Information');
      return;
    },
    [navigation],
  );

  return (
    <ScreenRootContainer title={headerTitle} showLogo hideGoBack>
      <ScrollView>
        <View style={style.container}>
          <View style={{alignItems: 'center'}}>
            <SquareGrid
              size={310}
              onPress={onBoxIconPress}
              icons={[
                [
                  <GridIcon label={prijava}>
                    <Report width={100} height={100} />
                  </GridIcon>,

                  <GridIcon label={edukacija}>
                    <Education width={100} height={100} />
                  </GridIcon>,
                ],
                [
                  <GridIcon label={oglasavanje}>
                    <Ads width={100} height={100} />
                  </GridIcon>,

                  <GridIcon label={informisanje}>
                    <Inform width={100} height={100} />
                  </GridIcon>,
                ],
              ]}
            />
          </View>
          <View style={style.buttonsContainer}>
            <CustomButton
              style={style.buttonContainer}
              text={ars}
              onPress={() => navigation.navigate('ArsInfo')}
            />
            <CustomButton
              style={style.buttonContainer}
              text={donatori}
              onPress={() => navigation.navigate('DonatorsAndFriends')}
            />
            <CustomButton
              style={style.buttonContainer}
              text={doniranje}
              onPress={() => navigation.navigate('Donation')}
            />
            <CustomButton
              style={style.violationListButton}
              textStyle={style.violationListButtonLabel}
              text={violationListButtonLabel}
              onPress={() => navigation.navigate('Violations')}
            />
          </View>
        </View>
        <EmptySpace height={80} />
      </ScrollView>
    </ScreenRootContainer>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 30,
    flex: 1,
    paddingLeft: 30,
  },
  buttonsContainer: {
    paddingTop: 30,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  violationListButton: {
    backgroundColor: ColorPallet.red,
  },
  violationListButtonLabel: {
    color: ColorPallet.plainWhite,
  },
});
