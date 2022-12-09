import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import Report from '../assets/icons/educationGrayBg.svg';
import {TextInput} from '../components/TextInput';
import {CustomButton} from '../components/CustomButton';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {loadPages, clearLoadedPages} from '../store/src/articles/actions';
import {
  getPaginatedPages,
  getFilteredPagesTotalCount,
} from '../store/src/articles/selectors';
import {ArticleList} from './components/ArticleList';

export const InformationScreen = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const text =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!';

  const dispatch = useAppDispatch();
  const paginatedPages = useAppSelector(getPaginatedPages);
  const paginatedPagesTotalCount = useAppSelector(getFilteredPagesTotalCount);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  const loadPaginatedPages = useCallback(
    async (searchTerm?: string) => {
      setIsLoading(true);

      await dispatch(
        loadPages({pageNumber: currentPage, pageSize, searchTerm}),
      );

      setIsLoading(false);
    },
    [currentPage, dispatch],
  );

  useEffect(() => {
    loadPaginatedPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(
    () => () => {
      dispatch(clearLoadedPages());
    },
    [dispatch],
  );

  const isLastPageAlreadyLoaded = useMemo(() => {
    const totalPages = paginatedPagesTotalCount / pageSize;

    return currentPage >= totalPages;
  }, [currentPage, paginatedPagesTotalCount]);

  const makeNextPageActive = () => {
    if (isLastPageAlreadyLoaded) {
      return;
    }
    setCurrentPage(current => ++current);
  };

  const handleRefresh = () => {
    dispatch(clearLoadedPages());
    loadPaginatedPages();
  };

  const handleSearch = () => {
    dispatch(clearLoadedPages());
    loadPaginatedPages(searchText);
  };

  return (
    <ScreenRootContainer title={'Informisanje'} showLogo>
      <ArticleList
        data={paginatedPages}
        currentArticlePage={currentPage}
        isLoading={isLoading}
        isLastPageAlreadyLoaded={isLastPageAlreadyLoaded}
        customLoaderElementOffset={150}
        listHeader={
          <View style={style.container}>
            <TextInput
              placeholder="Delatnost službe"
              placeholderTextColor={ColorPallet.lightGray}
              onChangeText={setSearchText}
            />

            <View style={style.btnContainer}>
              <CustomButton text="Pretraži" onPress={handleSearch} />
            </View>
          </View>
        }
        onNextPage={makeNextPageActive}
        onRefresh={handleRefresh}
      />

      <CustomModal
        title={'Informisanje'}
        text={text}
        icon={<Report width={100} height={100} />}
        onPress={() => setVisible(false)}
        visible={visible}
      />
    </ScreenRootContainer>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 10,
    backgroundColor: ColorPallet.plainWhite,
    flex: 1,
  },
  btnContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
});
