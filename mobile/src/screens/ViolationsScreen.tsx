import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {ImageListModal} from './ImageListModal';
import {bind} from '../util/helpers';
import {useAndroidBackNavigationOverride} from '../hooks/useAndroidBackNavigationOverride';

type SectionListViolationGroup = {
  title: string;
  data: ViolationResponseDto[];
};

export const ViolationsScreen = () => {
  const dispatch = useAppDispatch();
  const violations = useAppSelector(getViolations);
  const modalRef = useRef<BottomSheetModal>(null);
  const [selectedViolationId, setSelectedViolationId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const {mediaContent: selectedViolationMediaContent = []} = useMemo(
    () =>
      violations?.find(violation => violation.id === selectedViolationId) ??
      ({} as ViolationResponseDto),
    [selectedViolationId, violations],
  );

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

  const loadViolationData = useCallback(() => {
    setIsLoadingData(true);
    dispatch(loadViolations());
    setIsLoadingData(false);
  }, [dispatch]);

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

  const handleImageRowPress = useCallback((violationId: string) => {
    setSelectedViolationId(violationId);
    modalRef.current?.present();
  }, []);

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
          <ImageThumbnailRow
            mediaContent={mediaContent}
            onPress={bind(id, handleImageRowPress)}
          />
        </View>
      );
    },
    [handleImageRowPress],
  );

  const handleShouldCloseModal = () => modalRef.current?.close();

  useAndroidBackNavigationOverride(() => {
    if (!isModalVisible) {
      return false;
    }
    modalRef.current?.close();
    return true;
  });

  return (
    <ScreenRootContainer title="Prekršaji" showLogo isLoading={isLoadingData}>
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
        <ImageListModal
          myRef={modalRef}
          onShouldClose={handleShouldCloseModal}
          onVisibilityChange={setIsModalVisible}
          data={selectedViolationMediaContent?.map(
            ({id: fileId, relativeFilePath}) => ({
              id: fileId,
              fullPath: `https://c2e0-212-200-247-75.eu.ngrok.io/${relativeFilePath}`,
            }),
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
