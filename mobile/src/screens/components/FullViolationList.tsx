import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {groupBy} from 'lodash';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  SectionList,
  RefreshControl,
  SectionListRenderItemInfo,
  Text,
  SectionListData,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {EmptySpace} from '../../components/EmptySpace';
import {ImageThumbnailRow} from '../../components/ImageThumbnailRow';
import {Separator} from '../../components/Separator';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {useAndroidBackNavigationOverride} from '../../hooks/useAndroidBackNavigationOverride';
import {ViolationResponseDto} from '../../infrastructure/apiTypes';
import {ColorPallet} from '../../resources/ColorPallet';
import {loadViolations} from '../../store/src/reports/actions';
import {
  getFilterCategory,
  getFilterLocation,
  getViolations,
} from '../../store/src/reports/selectors';
import {bind} from '../../util/helpers';
import {ImageListModal} from '../ImageListModal';

type SectionListViolationGroup = {
  title: string;
  data: ViolationResponseDto[];
};

type FullViolationListProps = {
  renderListHeader: () => ReactElement;
};

export const FullViolationList = ({
  renderListHeader,
}: FullViolationListProps) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const dispatch = useAppDispatch();
  const handleShouldCloseModal = () => modalRef.current?.close();

  const [isLoadingData, setIsLoadingData] = useState(true);

  const loadViolationData = useCallback(async () => {
    setIsLoadingData(true);

    await dispatch(loadViolations());

    setIsLoadingData(false);
  }, [dispatch]);

  useEffect(() => {
    loadViolationData();
  }, [loadViolationData]);

  const [selectedViolationId, setSelectedViolationId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const filterCategory = useAppSelector(getFilterCategory);
  const filterLocation = useAppSelector(getFilterLocation);

  const violations = useAppSelector(getViolations);
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

  const handleImageRowPress = useCallback((violationId: string) => {
    setSelectedViolationId(violationId);
    modalRef.current?.present();
  }, []);

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

  useAndroidBackNavigationOverride(() => {
    if (!isModalVisible) {
      return false;
    }
    modalRef.current?.close();
    return true;
  });

  const renderItem = useCallback(
    ({item: violation}: SectionListRenderItemInfo<ViolationResponseDto>) => {
      const {address, description, location, mediaContent, id} = violation;

      const descriptionGuarded =
        description === undefined || description === 'undefined'
          ? ''
          : description;
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
          {descriptionGuarded ? (
            <Text numberOfLines={3} style={styles.descriptionText}>
              {descriptionGuarded}
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

  const getFilteredDataNew = (vCategory: string, fLocation: string) => {
    if (vCategory && !fLocation) {
      const filterByKey = violationsByGroup.filter(violation =>
        violation.data.find(v => v.violationCategory.name === vCategory),
      );

      const filterData = filterByKey.map(item => ({
        ...item,
        data: [...item.data].filter(
          list => list.violationCategory.name === vCategory,
        ),
      }));

      return filterData;
    } else if (fLocation && !vCategory) {
      const filterByKey = violationsByGroup.filter(violation =>
        violation.data.find(v => v.location === fLocation),
      );

      const filterData = filterByKey.map(item => ({
        ...item,
        data: [...item.data].filter(list => list.location === fLocation),
      }));
      return filterData;
    } else if (vCategory && fLocation) {
      const filterByKey = violationsByGroup.filter(violation =>
        violation.data.find(
          v =>
            v.location === fLocation && v.violationCategory.name === vCategory,
        ),
      );

      const filterData = filterByKey.map(item => ({
        ...item,
        data: [...item.data].filter(
          list =>
            list.location === fLocation &&
            list.violationCategory.name === vCategory,
        ),
      }));
      return filterData;
    } else {
      return violationsByGroup;
    }
  };

  const filteredSections = getFilteredDataNew(filterCategory, filterLocation);

  return isLoadingData && !violationsByGroup.length ? null : (
    <View style={styles.rootContainer}>
      <SectionList
        ListEmptyComponent={() => (
          <Text style={styles.container}>Ne postoje filtrirane opcije</Text>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingData}
            onRefresh={loadViolationData}
            progressViewOffset={250}
          />
        }
        sections={filteredSections}
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
            {filteredSections.length ? <Separator /> : null}
            <EmptySpace height={200} />
          </View>
        )}
        ListHeaderComponent={renderListHeader}
        keyExtractor={item => item.id}
        initialNumToRender={5}
      />
      <ImageListModal
        myRef={modalRef}
        onShouldClose={handleShouldCloseModal}
        onVisibilityChange={setIsModalVisible}
        data={selectedViolationMediaContent}
      />
    </View>
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
  container: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 18,
  },
});
