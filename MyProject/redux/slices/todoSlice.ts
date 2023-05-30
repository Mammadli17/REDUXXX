import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

interface TodoState {
  todos: any[];
  loading: 'reject' | 'pending' | 'fullfilled' | null;
  error: any;
  length: number;
}

const initialState: TodoState = {
  todos: [],
  loading: null,
  error: null,
  length: 0,
};

export const getTodos = createAsyncThunk('get/todos', async () => {
  const response = await axios.get("https://64731455d784bccb4a3c3e14.mockapi.io/blogs/");
  return response.data;
});

export const deleteById = createAsyncThunk('delete/todos', async (payload: any) => {
  const response = await axios.delete(`https://64731455d784bccb4a3c3e14.mockapi.io/blogs/${payload}`);
  return response.data;
});

export const postTodo = createAsyncThunk('post/todos', async (payload: any) => {
  const response = await axios.post("https://64731455d784bccb4a3c3e14.mockapi.io/blogs/", payload);
  return response.data;
});

export const updateTodo = createAsyncThunk('update/todo', async (payload: { id: string, title: string, description: string }) => {
  const { id, title, description } = payload;
  const response = await axios.put(`https://64731455d784bccb4a3c3e14.mockapi.io/blogs/${id}`, { title, description });
  return response.data;
});

const todoSlice = createSlice({
  name: 'Todos',
  initialState: initialState,
  reducers: {
    length: (state) => {
      state.length = state.todos.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = 'fullfilled';
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state) => {
        state.loading = 'reject';
      })
      .addCase(deleteById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.loading = 'fullfilled';
        state.todos = state.todos.filter((e) => e.id !== action.payload.id);
      })
      .addCase(deleteById.rejected, (state) => {
        state.loading = 'reject';
      })
      .addCase(postTodo.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.loading = 'fullfilled';
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = 'fullfilled';
       
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state) => {
        state.loading = 'reject';
      });
  },
});

export const { length } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
