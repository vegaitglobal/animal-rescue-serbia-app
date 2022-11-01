import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import Report from '../assets/icons/report.svg';
import Inform from '../assets/icons/inform.svg';
import Add from '../assets/icons/add.svg';
import Education from '../assets/icons/education.svg';
import {CustomButton} from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {EmptySpace} from '../components/EmptySpace';
import {SquareGrid} from '../components/SquareGrid/SquareGrid';
import {GridIcon} from '../components/SquareGrid/GridIcon';

export const HomeScreen = () => {
  const headerTitle = 'Prijavi';
  const ars = 'Animal Rescue Srbija';
  const donatori = 'Donatori i prijatelji';
  const doniranje = 'Doniranje';
  const prijava = 'Prijava ';
  const edukacija = 'Edukacija';
  const oglasavanje = 'Oglasavanje';
  const informisanje = 'Informisanje';
  const violationListButtonLabel = 'Lista prekršaja';

  const navigation = useNavigation();

  const onBoxIconPress = useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (rowIndex === 0) {
        if (columnIndex === 0) {
          navigation.navigate('Report');
          return;
        }

        //Do something Education related here
        return;
      }

      if (columnIndex === 0) {
        // Do something Ads related
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
                    <Add width={100} height={100} />
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
              onPress={() => {}}
            />
            <CustomButton
              style={style.buttonContainer}
              text={donatori}
              onPress={() => {}}
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
        <EmptySpace height={40} />
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
