import React, {ReactElement, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ActivityIndicator} from '../../components/ActivityIndicator';
import {EmptySpace} from '../../components/EmptySpace';
import {MediaContentBox} from '../../components/MediaContentBox';
import {ArticleResponseDto} from '../../infrastructure/apiTypes';

type ArticleListProps = {
  isLoading: boolean;
  isLastPageAlreadyLoaded: boolean;
  currentArticlePage: number;
  onRefresh: () => void;
  onNextPage: () => void;
  data: ArticleResponseDto[];
  listHeader?: ReactElement;
  customLoaderElementOffset?: number;
};

export const ArticleList = ({
  isLastPageAlreadyLoaded,
  isLoading,
  currentArticlePage,
  onRefresh,
  onNextPage,
  data,
  listHeader,
  customLoaderElementOffset,
}: ArticleListProps) => {
  const renderItem = useCallback(({item}: {item: ArticleResponseDto}) => {
    return (
      <View>
        <Text style={styles.title}>{item.title}</Text>

        <EmptySpace height={20} />

        {item.mediaContent ? (
          <>
            <MediaContentBox
              width={availableWidth}
              height={mediaContentHeightWithAspectRatio}
              mediaContent={item.mediaContent}
            />
            <EmptySpace height={20} />
          </>
        ) : null}

        <Text>{item.decription}</Text>
      </View>
    );
  }, []);

  const isLoadingInitially = isLoading && currentArticlePage === 1;

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <EmptySpace height={20} />}
        ListFooterComponent={
          <Footer loadedFullList={isLastPageAlreadyLoaded} />
        }
        ListHeaderComponent={listHeader}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingInitially}
            onRefresh={onRefresh}
            progressViewOffset={customLoaderElementOffset ?? 50}
          />
        }
        showsVerticalScrollIndicator={false}
        onEndReached={onNextPage}
      />
    </View>
  );
};

const Footer = ({loadedFullList}: {loadedFullList: boolean}) => {
  if (loadedFullList) {
    return <EmptySpace height={50} />;
  }

  return (
    <View style={styles.footerLoadingIndicatorContainer}>
      <ActivityIndicator />
    </View>
  );
};

const screenPadding = 20;
const screenWidth = Dimensions.get('screen').width;
const availableWidth = screenWidth - screenPadding;
const mediaContentHeightWithAspectRatio = availableWidth / (16 / 9);

const styles = StyleSheet.create({
  rootContainer: {
    padding: screenPadding,
  },
  footerLoadingIndicatorContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  fullScreenLoadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
