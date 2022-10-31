import React, {useCallback, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  SectionList,
  SectionListRenderItemInfo,
  SectionListData,
  StyleSheet,
  TextStyle,
  Image,
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
      section: {title},
    }: {
      section: SectionListData<ViolationResponseDto, SectionListViolationGroup>;
    }) => <Text style={style.sectionHeader}>{title}</Text>,
    [],
  );

  const renderItem = useCallback(
    ({item: violation}: SectionListRenderItemInfo<ViolationResponseDto>) => {
      const {address, description, location, mediaContent} = violation;

      const testSingle = mediaContent?.[0] ?? {};
      console.log(`https://localhost:7113/${testSingle.id}.jpeg`);
      console.log('Full relative path: ', testSingle.relativeFilePath);
      console.log(
        '1: ',
        `https://localhost:7113/${encodeURIComponent(
          testSingle.relativeFilePath,
        )}`,
      );
      return (
        <View style={style.itemRootContainer}>
          <View style={style.titleRowContainer}>
            <Text style={style.addressText}>{address}</Text>
            <Text style={style.locationText}>{location}</Text>
          </View>
          <EmptySpace height={8} />
          {description ? (
            <Text numberOfLines={3} style={style.descriptionText}>
              {description}
            </Text>
          ) : null}
          <EmptySpace height={16} />
          <View>
            <Image
              style={{width: 50, height: 50, backgroundColor: 'red'}}
              //TODO: Create Base url environment variable to avoid issues with duplicated setup of it
              source={{
                uri: `https://e322-178-223-242-185.eu.ngrok.io/${testSingle.relativeFilePath}`,
              }}
            />
          </View>
        </View>
      );
    },
    [],
  );

  return (
    <ScreenRootContainer title="Prekršaji" showLogo>
      <View style={style.rootContainer}>
        <View style={style.topSpacer} />
        <SectionList
          sections={violationsByGroup}
          stickySectionHeadersEnabled
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          SectionSeparatorComponent={() => <EmptySpace height={16} />}
          ItemSeparatorComponent={() => (
            <>
              <EmptySpace height={8} />
              <Separator />
              <EmptySpace height={8} />
            </>
          )}
          ListFooterComponent={() => (
            <View style={style.footerContainer}>
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

const style = StyleSheet.create({
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
