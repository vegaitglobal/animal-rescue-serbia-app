import React, {useCallback, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  SectionList,
  SectionListRenderItemInfo,
  SectionListData,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {EmptySpace} from '../components/EmptySpace';
import {Separator} from '../components/Separator';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {ViolationResponseDto} from '../infrastructure/apiTypes';
import {loadViolations} from '../store/src/reports/actions';
import {getViolations} from '../store/src/reports/selectors';
import {groupBy} from 'lodash';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import {ImageThumbnailRow} from '../components/ImageThumbnailRow';

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

      return [
        ...acc,
        {
          title: groupName,
          data: groupData,
        },
      ];
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
      section: {title, data},
    }: {
      section: SectionListData<ViolationResponseDto, SectionListViolationGroup>;
    }) => (
      <Text key={data?.[0]?.id ?? ''} style={styles.sectionHeader}>
        {title}
      </Text>
    ),
    [],
  );

  const renderItem = useCallback(
    ({item: violation}: SectionListRenderItemInfo<ViolationResponseDto>) => {
      const {address, description, location, mediaContent, id} = violation;

      return (
        <View key={id} style={styles.itemRootContainer}>
          <View style={styles.titleRowContainer}>
            <Text numberOfLines={1} style={styles.addressText}>
              {address}
            </Text>
            <Text numberOfLines={1} style={styles.locationText}>
              {location}
            </Text>
          </View>
          <EmptySpace height={8} />
          {description ? (
            <Text numberOfLines={3} style={styles.descriptionText}>
              {description}
            </Text>
          ) : null}
          <EmptySpace height={16} />
          <ImageThumbnailRow mediaContent={mediaContent} />
        </View>
      );
    },
    [],
  );

  //TODO: Details screen
  return (
    <ScreenRootContainer title="Prekršaji" showLogo>
      <View style={styles.rootContainer}>
        <View style={styles.topSpacer} />
        <SectionList
          sections={violationsByGroup}
          stickySectionHeadersEnabled
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          SectionSeparatorComponent={() => <EmptySpace height={16} />}
          ItemSeparatorComponent={() => (
            <>
              <EmptySpace height={16} />
              <Separator />
              <EmptySpace height={16} />
            </>
          )}
          ListFooterComponent={() => (
            <View style={styles.footerContainer}>
              <Separator />
              <EmptySpace height={200} />
            </View>
          )}
        />
      </View>
    </ScreenRootContainer>
  );
};

const titleStyle: TextStyle = {
  fontWeight: '800',
  color: ColorPallet.plainBlack,
};

const styles = StyleSheet.create({
  rootContainer: {
    flexGrow: 1,
  },
  itemRootContainer: {
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  titleRowContainer: {
    flexDirection: 'row',
  },
  addressText: {
    flex: 1,
    ...titleStyle,
  },
  locationText: {
    ...titleStyle,
  },
  descriptionText: {
    color: ColorPallet.plainBlack,
  },
  sectionHeader: {
    backgroundColor: ColorPallet.gray,
    color: ColorPallet.plainWhite,
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontSize: 14,
  },
  footerContainer: {
    transform: [{translateY: -8}],
  },
  topSpacer: {
    height: 24,
    backgroundColor: ColorPallet.gray,
  },
});
