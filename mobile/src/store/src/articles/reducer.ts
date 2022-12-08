import {createSlice} from '@reduxjs/toolkit';
import {clearLoadedArticles, loadArticles} from './actions';
import {getInitialState} from './initialState';

const initialState = getInitialState();

export const articleSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadArticles.fulfilled,
        (state, {payload: {entities, filteredCount, pageNumber}}) => {
          state.pageNumber = pageNumber;
          state.filteredCount = filteredCount;
          state.entities = [...state.entities, ...entities];
        },
      )
      .addCase(clearLoadedArticles, state => {
        state.entities = initialState.entities;
        state.filteredCount = initialState.filteredCount;
        state.pageNumber = initialState.pageNumber;
      });
  },
});

export const articleReducer = articleSlice.reducer;
