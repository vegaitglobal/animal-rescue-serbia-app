import React, {useCallback, useEffect} from 'react';
import {View, FlatList, Text, ListRenderItemInfo} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {ViolationResponseDto} from '../infrastructure/apiTypes';
import {loadViolations} from '../store/src/reports/actions';
import {getViolations} from '../store/src/reports/selectors';

export const ViolationsScreen = () => {
  const dispatch = useAppDispatch();
  const violations = useAppSelector(getViolations);
  //   ?.concat([
  //     {description: 'red'},
  //     {description: 'green'},
  //     {description: 'blue'},
  //   ]);

  const loadViolationData = useCallback(
    () => dispatch(loadViolations()),
    [dispatch],
  );

  useEffect(() => {
    loadViolationData();
  }, [loadViolationData]);

  const renderItem = useCallback(
    ({item: violation}: ListRenderItemInfo<ViolationResponseDto>) => {
      return (
        <Text
          style={{height: 30, backgroundColor: 'gray', color: 'white'}}
          numberOfLines={1}>
          {violation.description}
        </Text>
      );
    },
    [],
  );

  return (
    <View style={{flexGrow: 1, backgroundColor: 'red'}}>
      <FlatList data={violations} renderItem={renderItem} />
    </View>
  );
};
