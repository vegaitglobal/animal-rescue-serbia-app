import {createSlice} from '@reduxjs/toolkit';
import {
  clearLoadedArticles,
  clearLoadedPages,
  loadArticles,
  loadPages,
} from './actions';
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
      .addCase(
        loadPages.fulfilled,
        (state, {payload: {entities, filteredCount, pageNumber}}) => {
          state.pages.pageNumber = pageNumber;
          state.pages.filteredCount = filteredCount;
          state.pages.entities = [...state.entities, ...entities];
        },
      )
      .addCase(clearLoadedArticles, state => {
        state.entities = initialState.entities;
        state.filteredCount = initialState.filteredCount;
        state.pageNumber = initialState.pageNumber;
      })
      .addCase(clearLoadedPages, state => {
        state.pages = initialState.pages;
      });
  },
});

export const articleReducer = articleSlice.reducer;
