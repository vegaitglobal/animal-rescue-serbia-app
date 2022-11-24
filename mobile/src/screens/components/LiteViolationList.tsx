import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {EmptySpace} from '../../components/EmptySpace';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {LiteViolationResponseDto} from '../../infrastructure/apiTypes';
import {loadLiteViolations} from '../../store/src/reports/actions';
import {getSortedLiteViolations} from '../../store/src/reports/selectors';

type LiteViolationListProps = {
  renderHeaderComponent: () => ReactElement;
};

export const LiteViolationList = ({
  renderHeaderComponent,
}: LiteViolationListProps) => {
  const dispatch = useAppDispatch();
  const violations = useAppSelector(getSortedLiteViolations);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <FlatList
      data={violations}
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
          progressViewOffset={150}
        />
      }
    />
  );
};

//TODONF: Consider moving these from components folder which indicates reusability
