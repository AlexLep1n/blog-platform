import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    createdSlugs: [],
  },
  selectors: {
    slugSelector: (state) => state.createdSlugs,
  },
  reducers: {
    addSlug: (state, { payload: newSlug }) => {
      console.log(newSlug);
      state.createdSlugs.push(newSlug);
    },
    deleteSlug: (state, { payload: removedSlug }) => {
      state.createdSlugs = state.createdSlugs.filter((slug) => slug !== removedSlug);
    },
  },
});

export const { addSlug, deleteSlug } = articlesSlice.actions;
export const { slugSelector } = articlesSlice.selectors;
export default articlesSlice.reducer;
