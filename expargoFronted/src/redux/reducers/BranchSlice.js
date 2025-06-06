// redux/reducers/BranchSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:7777/api/branches';

// Token-lı sorğular üçün header qaydası:
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Filialları gətir (token olmadan)
export const fetchBranches = createAsyncThunk(
  'branches/fetchBranches',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Filial əlavə et (token tələb olunur)
export const createBranch = createAsyncThunk(
  'branches/createBranch',
  async (branchData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, branchData, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Filialu yenilə (token tələb olunur)
export const updateBranch = createAsyncThunk(
  'branches/updateBranch',
  async ({ id, branchData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, branchData, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Filial sil (token tələb olunur)
export const deleteBranch = createAsyncThunk(
  'branches/deleteBranch',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const branchSlice = createSlice({
  name: 'branches',
  initialState: {
    branches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchBranches
      .addCase(fetchBranches.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBranches.fulfilled, (state, action) => { state.loading = false; state.branches = action.payload; })
      .addCase(fetchBranches.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // createBranch
      .addCase(createBranch.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches.push(action.payload);
      })
      .addCase(createBranch.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // updateBranch
      .addCase(updateBranch.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.branches.findIndex(b => b._id === action.payload._id);
        if (index !== -1) state.branches[index] = action.payload;
      })
      .addCase(updateBranch.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // deleteBranch
      .addCase(deleteBranch.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = state.branches.filter(b => b._id !== action.payload);
      })
      .addCase(deleteBranch.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default branchSlice.reducer;
