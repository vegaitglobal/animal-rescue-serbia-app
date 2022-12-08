import {createSlice} from '@reduxjs/toolkit';
import {loadArticles} from './actions';
import {getInitialState} from './initialState';

const initialState = getInitialState();

export const articleSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadArticles.fulfilled, (state, {payload}) => {
      state.articles = payload;
    });
  },
});

export const articleReducer = articleSlice.reducer;
