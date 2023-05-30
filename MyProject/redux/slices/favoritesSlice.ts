import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://64731455d784bccb4a3c3e14.mockapi.io/blogs';

interface Blog {
  id: string;
  favorite: boolean;
  // Add other properties of the blog object
}

// Async action to toggle a blog's favorite status
export const toggleFavorite = createAsyncThunk('blogs/toggleFavorite', async (id: string) => {
  const response = await axios.put<Blog>(`${apiUrl}/${id}`, { favorite: true });
  return response.data;
});

interface FavoritesState {
  favorites: Blog[];
  loading: 'idle' | 'pending';
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: 'idle',
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = 'idle';
        const toggledBlog = action.payload;
        const blogIndex = state.favorites.findIndex((blog) => blog.id === toggledBlog.id);

        if (blogIndex !== -1) {
          state.favorites.splice(blogIndex, 1);
        } else {
          state.favorites.push(toggledBlog);
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message as string;
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer; // Export the reducer

export default favoritesSlice;
