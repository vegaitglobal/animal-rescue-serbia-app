import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ActivityIndicator} from '../components/ActivityIndicator';
import {EmptySpace} from '../components/EmptySpace';
import {MediaContentBox} from '../components/MediaContentBox';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {ArticleResponseDto} from '../infrastructure/apiTypes';
import {clearLoadedArticles, loadArticles} from '../store/src/articles/actions';
import {
  getFilteredArticlesTotalCount,
  getPaginatedArticles,
} from '../store/src/articles/selectors';

export const EducationScreen = () => {
  const dispatch = useAppDispatch();
  const paginatedArticles = useAppSelector(getPaginatedArticles);
  const paginatedArticlesTotalCount = useAppSelector(
    getFilteredArticlesTotalCount,
  );
  const [currentArticlePage, setCurrentArticlePage] = useState(1);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);

  const loadPaginatedArticles = useCallback(async () => {
    setIsLoading(true);

    await dispatch(loadArticles({pageNumber: currentArticlePage, pageSize}));

    setIsLoading(false);
  }, [currentArticlePage, dispatch]);

  useEffect(() => {
    loadPaginatedArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArticlePage]);

  useEffect(
    () => () => {
      dispatch(clearLoadedArticles());
    },
    [dispatch],
  );

  const isLastPageAlreadyLoaded = useMemo(() => {
    const totalPages = paginatedArticlesTotalCount / pageSize;
    return currentArticlePage >= totalPages;
  }, [currentArticlePage, paginatedArticlesTotalCount]);

  const makeNextPageActive = () => {
    if (isLastPageAlreadyLoaded) {
      return;
    }
    setCurrentArticlePage(current => ++current);
  };

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
    <ScreenRootContainer title="Edukacija">
      <View style={styles.rootContainer}>
        <FlatList
          data={paginatedArticles}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <EmptySpace height={20} />}
          ListFooterComponent={
            <Footer loadedFullList={isLastPageAlreadyLoaded} />
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoadingInitially}
              onRefresh={() => {
                dispatch(clearLoadedArticles());
                loadPaginatedArticles();
              }}
              progressViewOffset={50}
            />
          }
          showsVerticalScrollIndicator={false}
          onEndReached={makeNextPageActive}
        />
      </View>
    </ScreenRootContainer>
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
