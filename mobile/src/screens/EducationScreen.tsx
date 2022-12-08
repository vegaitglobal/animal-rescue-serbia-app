import React, {useCallback, useEffect} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {EmptySpace} from '../components/EmptySpace';
import {MediaContentBox} from '../components/MediaContentBox';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {ArticleResponseDto} from '../infrastructure/apiTypes';
import {loadArticles} from '../store/src/articles/actions';
import {getPaginatedArticles} from '../store/src/articles/selectors';

export const EducationScreen = () => {
  const dispatch = useAppDispatch();
  const paginatedArticles = useAppSelector(getPaginatedArticles);

  const loadPaginatedArticles = useCallback(async () => {
    await dispatch(loadArticles({pageNumber: 1, pageSize: 10}));
  }, [dispatch]);

  useEffect(() => {
    loadPaginatedArticles();
  }, [loadPaginatedArticles]);

  const renderItem = useCallback(({item}: {item: ArticleResponseDto}) => {
    return (
      <View>
        <Text style={{fontSize: 20, fontWeight: '800'}}>{item.title}</Text>

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

  return (
    <ScreenRootContainer title="Edukacija">
      <View style={styles.rootContainer}>
        <FlatList
          data={paginatedArticles.entities}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <EmptySpace height={20} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenRootContainer>
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
});
