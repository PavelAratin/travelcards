import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './Slices/CardsSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});

export default store;