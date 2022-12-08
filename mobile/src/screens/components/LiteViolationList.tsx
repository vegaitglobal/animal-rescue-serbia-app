import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {EmptySpace} from '../../components/EmptySpace';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {LiteViolationResponseDto} from '../../infrastructure/apiTypes';
import {loadLiteViolations} from '../../store/src/reports/actions';
import {
  getFilterCategory,
  getFilterLocation,
  getSortedLiteViolations,
} from '../../store/src/reports/selectors';

type LiteViolationListProps = {
  renderHeaderComponent: () => ReactElement;
};

export const LiteViolationList = ({
  renderHeaderComponent,
}: LiteViolationListProps) => {
  const dispatch = useAppDispatch();
  const violations = useAppSelector(getSortedLiteViolations);
  const [isLoading, setIsLoading] = useState(false);

  const filterCategory = useAppSelector(getFilterCategory);
  const filterLocation = useAppSelector(getFilterLocation);

  const loadViolations = useCallback(async () => {
    setIsLoading(true);

    await dispatch(loadLiteViolations());

    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadViolations();
  }, [loadViolations]);

  //TODO: vvvvvvvvvvvvvvvvvvvvvvvv
  //SplashScreen
  //LiteViolationsFormat
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<LiteViolationResponseDto>) => {
      return (
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <Text numberOfLines={5}>{item.violationCategory.name}</Text>
          <Text numberOfLines={5}>{item.location}</Text>
        </View>
      );
    },
    [],
  );

  const getFilteredData = (vCategory: string, fLocation: string) => {
    return vCategory && !fLocation
      ? violations.filter(
          violation => violation.violationCategory.name === vCategory,
        )
      : fLocation && !vCategory
      ? violations.filter(violation => violation.location === fLocation)
      : vCategory && fLocation
      ? violations.filter(
          violation =>
            violation.location === fLocation &&
            violation.violationCategory.name === vCategory,
        )
      : violations;
  };

  return (
    <FlatList
      ListEmptyComponent={() => (
        <Text style={styles.container}>Ne postoje filtrirane opcije</Text>
      )}
      data={getFilteredData(filterCategory, filterLocation)}
      renderItem={renderItem}
      contentContainerStyle={{paddingBottom: 20}}
      ListHeaderComponent={
        <>
          {renderHeaderComponent()}
          <EmptySpace height={20} />
        </>
      }
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadViolations}
          progressViewOffset={250}
        />
      }
      keyExtractor={(item)=>item.id}
      initialNumToRender={5}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    fontSize: 18,
  },
});

//TODO: Style extraction
//TODONF: Consider moving these from components folder which indicates reusability
