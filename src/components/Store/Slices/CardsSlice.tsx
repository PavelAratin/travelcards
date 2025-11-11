import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../Constans";

export const getCards = createAsyncThunk('cards/getCards', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/travel_cards`);
    if (!response.ok) {
      throw new Error("Карточки мест для путешествий не загрузились");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    imageSrcError: [],
    favorites: [],
    likes: [],
  },
  reducers: {
    addImageError: (state, action) => {
      const cardId = action.payload;
      if (!state.imageSrcError.includes(cardId)) {
        state.imageSrcError.push(cardId);
      }
    },
    clearImageErrors: (state) => {
      state.imageSrcError = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    deleteCard: (state, action) => {
      const cardId = action.payload;
      state.items = state.items.filter((card) => card.id !== cardId)
    },
    toggleFavorites: (state, action) => {
      const cardId = action.payload;
      const isFavorite = state.favorites.includes(cardId)
      if (isFavorite) {
        state.favorites = state.favorites.filter(id => id !== cardId)
      } else {
        state.favorites.push(cardId);
      }
    },
    toggleLike: (state, action) => {
      const cardId = action.payload;
      const isLike = state.likes.includes(cardId)
      if (isLike) {
        state.likes = state.likes.filter(id => id !== cardId)
      } else {
        state.likes.push(cardId);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.items = [];
      });
  },
});

// Экспортируем actions
export const { addImageError, clearImageErrors, clearError, deleteCard, toggleFavorites, toggleLike } = cardsSlice.actions;

// Экспортируем редюсер
export default cardsSlice.reducer;