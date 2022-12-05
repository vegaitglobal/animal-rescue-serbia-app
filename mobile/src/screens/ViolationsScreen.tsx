import React, {useState} from 'react';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {LiteViolationList} from './components/LiteViolationList';
import {FullViolationList} from './components/FullViolationList';
import {Segment, SegmentedControl} from '../components/SegmentedControl';
import {SelectionInput} from '../components/SelectionInput';
import {StyleSheet, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {
  getLocations,
  getViolationCategories,
} from '../store/src/reports/selectors';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {ItemData} from '../components/commonTypes';
import {
  setFilterCategory,
  setFilterLocation,
} from '../store/src/reports/actions';

export const ViolationsScreen = () => {
  const [isFullViolationList, setIsFullViolationList] = useState(true);
  const violationCategories = useAppSelector(getViolationCategories);
  const violationLocations = useAppSelector(getLocations);

  const dispatch = useAppDispatch();

  const onSegmentChange = (segment: Segment) => {
    setIsFullViolationList(segment === 'left');
  };

  const renderListHeader = () => (
    <>
      <View style={styles.container} />
      <SelectionInput
        hasFilter={true}
        handleClearFilter={() => dispatch(setFilterCategory(''))}
        onValueSelected={item => dispatch(setFilterCategory(item.label))}
        data={violationCategories?.map(
          item =>
            ({
              id: item.id,
              label: item.name,
            } ?? []),
        )}
        placeholderLabel={'Filtriranje po kategoriji'}
      />
      <SelectionInput
        hasFilter={true}
        handleClearFilter={() => dispatch(setFilterLocation(''))}
        onValueSelected={item => dispatch(setFilterLocation(item.label))}
        data={violationLocations?.map(
          (item, index) =>
            ({
              label: item,
              id: index.toString(),
            } as ItemData),
        )}
        placeholderLabel={'Filtriranje po lokaciji'}
      />
      <SegmentedControl
        activeSegment={isFullViolationList ? 'left' : 'right'}
        onSegmentChange={onSegmentChange}
        segmentNames={{left: 'Potpuni prekršaji', right: 'Brzi prekršaji'}}
      />
    </>
  );

  return (
    <ScreenRootContainer title="Prekršaji" showLogo>
      {isFullViolationList ? (
        <FullViolationList renderListHeader={renderListHeader} />
      ) : (
        <LiteViolationList renderHeaderComponent={renderListHeader} />
      )}
    </ScreenRootContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPallet.gray,
    height: 30,
  },
});
