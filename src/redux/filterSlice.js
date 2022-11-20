import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    foundedContact(state, action) {
      return (state = action.payload);
    },
  },
});

export const { foundedContact } = filterSlice.actions;

// Selectors
export const getFilter = state => state.filter;
