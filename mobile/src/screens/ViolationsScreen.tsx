import React, {useCallback, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  SectionList,
  SectionListRenderItemInfo,
  SectionListData,
  StyleSheet,
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
        <View style={style.itemRootContainer}>
          <View style={style.titleRowContainer}>
            <Text style={style.addressText}>{address}</Text>
            <Text>{location}</Text>
          </View>
          <EmptySpace height={8} />
          <Text style={style.locationText} numberOfLines={1}>
            {description}
          </Text>
        </View>
      );
    },
    [],
  );

  return (
    <View style={style.rootContainer}>
      <SectionList
        sections={violationsByGroup}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};

const style = StyleSheet.create({
  rootContainer: {
    flexGrow: 1,
    backgroundColor: 'red',
  },
  itemRootContainer: {
    height: 70,
    backgroundColor: 'gray',
    justifyContent: 'center',
  },
  titleRowContainer: {
    flexDirection: 'row',
  },
  addressText: {
    flex: 1,
  },
  locationText: {
    color: 'white',
  },
});
