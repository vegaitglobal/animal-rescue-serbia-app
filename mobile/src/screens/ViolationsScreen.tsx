import React, {useCallback, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  SectionList,
  SectionListRenderItemInfo,
  SectionListData,
} from 'react-native';
import {EmptySpace} from '../components/EmptySpace';
import {Separator} from '../components/Separator';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {ViolationResponseDto} from '../infrastructure/apiTypes';
import {loadViolations} from '../store/src/reports/actions';
import {getViolations} from '../store/src/reports/selectors';
import {groupBy} from 'lodash';

type SectionListViolationGroup = {
  title: string;
  data: ViolationResponseDto[];
};

export const ViolationsScreen = () => {
  const dispatch = useAppDispatch();
  const violations = useAppSelector(getViolations);

  const violationsByGroup = useMemo(() => {
    const groups = groupBy(
      violations,
      ({violationCategory}) => violationCategory.id,
    );

    return Object.entries(groups).reduce((acc, [_, groupData]) => {
      const groupName = groupData?.[0]?.violationCategory?.name ?? '';

      return [...acc, {title: groupName, data: groupData}];
    }, [] as SectionListViolationGroup[]);
  }, [violations]);

  const loadViolationData = useCallback(
    () => dispatch(loadViolations()),
    [dispatch],
  );

  useEffect(() => {
    loadViolationData();
  }, [loadViolationData]);

  const renderSectionHeader = useCallback(
    ({
      section: {title},
    }: {
      section: SectionListData<ViolationResponseDto, SectionListViolationGroup>;
    }) => <Text>{title}</Text>,
    [],
  );
  const renderItem = useCallback(
    ({item: violation}: SectionListRenderItemInfo<ViolationResponseDto>) => {
      const {address, description, location, mediaContent} = violation;

      return (
        <View
          style={{
            height: 70,
            backgroundColor: 'gray',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}>{address}</Text>
            <Text>{location}</Text>
          </View>
          <EmptySpace height={8} />
          <Text style={{color: 'white'}} numberOfLines={1}>
            {description}
          </Text>
        </View>
      );
    },
    [],
  );

  return (
    <View style={{flexGrow: 1, backgroundColor: 'red'}}>
      <SectionList
        sections={violationsByGroup}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};
