import { createSlice } from '@reduxjs/toolkit';

const loadFormLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('createdSlugs');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.warn('Ошибка при загрузки состояния из localStorage', error);
  }
};

const saveToLocalStorage = (currentSlugs) => {
  try {
    const serializedState = JSON.stringify(currentSlugs);
    localStorage.setItem('createdSlugs', serializedState);
  } catch (error) {
    console.warn('Ошибка при сохранении состояния в localStorage', error);
  }
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    createdSlugs: loadFormLocalStorage(),
  },
  reducers: {
    addSlug: (state, { payload: newSlug }) => {
      console.log(newSlug);
      state.createdSlugs.push(newSlug);
      saveToLocalStorage(state.createdSlugs);
    },
    deleteSlug: (state, { payload: removedSlug }) => {
      state.createdSlugs = state.createdSlugs.filter((slug) => slug !== removedSlug);
      saveToLocalStorage(state.createdSlugs);
    },
  },
});

export const { addSlug, deleteSlug } = articlesSlice.actions;
export const slugSelector = (state) => state.articles.createdSlugs;
export default articlesSlice.reducer;
