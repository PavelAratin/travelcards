import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../../../Constans";

interface CardType {
  id: string;
  image_url: string;
  destination: string;
  short_description: string;
  continent: string;
  budget_level: string;
  priority: string;
  category: string; // добавляем это поле
  detailed_description?: string;
  best_time_to_visit?: string;
  must_see?: string[];
  activities?: string[];
  completed?: boolean;
  tags?: string[];
}

interface CardsState {
  items: CardType[];
  isLoading: boolean;
  error: string | null;
  imageSrcError: string[];
  favorites: string[];
  likes: string[];
  currentFilter: string;
}

const initialState: CardsState = {
  items: [],
  isLoading: false,
  error: null,
  imageSrcError: [],
  favorites: [],
  likes: [],
  currentFilter: 'all'
};

export const getCards = createAsyncThunk('cards/getCards', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/travel_cards`);
    if (!response.ok) {
      throw new Error("Карточки мест для путешествий не загрузились");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Неизвестная ошибка');
  }
});

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addImageError: (state, action: PayloadAction<string>) => {
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
    addCard: (state, action: PayloadAction<CardType>) => {
      state.items.push(action.payload);
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      state.items = state.items.filter((card) => card.id !== cardId)
    },
    toggleFavorites: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      const isFavorite = state.favorites.includes(cardId)
      if (isFavorite) {
        state.favorites = state.favorites.filter(id => id !== cardId)
      } else {
        state.favorites.push(cardId);
      }
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      const isLike = state.likes.includes(cardId)
      if (isLike) {
        state.likes = state.likes.filter(id => id !== cardId)
      } else {
        state.likes.push(cardId);
      }
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.currentFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCards.fulfilled, (state, action: PayloadAction<CardType[]>) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.items = [];
      });
  },
});

export const { addImageError, clearImageErrors, clearError, deleteCard, toggleFavorites, toggleLike, setFilter, addCard } = cardsSlice.actions;
export default cardsSlice.reducer;