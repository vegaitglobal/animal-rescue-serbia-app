import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import Report from '../assets/icons/report.svg';
import Inform from '../assets/icons/inform.svg';
import Add from '../assets/icons/add.svg';
import Education from '../assets/icons/education.svg';
import {CustomButton} from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

export const HomeScreen = () => {
  const headerTitle = 'Prijavi';
  const ars = 'Animal Rescue Srbija';
  const donatori = 'Donatori i prijatelji';
  const doniranje = 'Doniranje';
  const prijava = 'Prijava ';
  const edukacija = 'Edukacija';
  const oglasavanje = 'Oglasavanje';
  const informisanje = 'Informisanje';

  const navigation = useNavigation();

  return (
    <ScreenRootContainer title={headerTitle} showLogo hideGoBack>
      <View style={style.container}>
        <View style={style.iconsContainer}>
          <View style={style.firstContainer}>
            <View style={style.reportContainer}>
              <Pressable onPress={() => navigation.navigate('Report')}>
                <Report width={100} height={100} />
              </Pressable>
              <Text style={style.text}>{prijava}</Text>
            </View>
            <View style={style.educationContainer}>
              <Pressable onPress={() => {}}>
                <Education width={100} height={100} />
              </Pressable>
              <Text style={style.text}>{edukacija}</Text>
            </View>
          </View>

          <View style={style.firstContainer}>
            <View style={style.addContainer}>
              <Pressable onPress={() => {}}>
                <Add width={100} height={100} />
              </Pressable>
              <Text style={style.text}>{oglasavanje}</Text>
            </View>
            <View style={style.informContainer}>
              <Pressable onPress={() => navigation.navigate('Information')}>
                <Inform width={100} height={100} />
              </Pressable>
              <Text style={style.text}>{informisanje}</Text>
            </View>
          </View>
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
        </View>
      </View>
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
  firstContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  educationContainer: {
    paddingLeft: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  addContainer: {
    borderRightColor: 'black',
    borderRightWidth: 1,
    paddingRight: 20,
    paddingTop: 5,
  },
  reportContainer: {
    borderRightColor: 'black',
    borderRightWidth: 1,
    paddingRight: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  informContainer: {
    paddingLeft: 20,
  },
  buttonsContainer: {
    paddingTop: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 12,
    alignSelf: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  iconsContainer: {
    marginLeft: -10,
  },
});
