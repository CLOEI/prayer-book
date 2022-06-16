import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import idb from '../../utils/idb';

export const getPrayers = createAsyncThunk(
    'prayer/getPrayers',
    async () => {
      return idb.readData('prayers');
    },
);
export const addPrayer = createAsyncThunk(
    'prayer/addPrayer',
    async (prayers: Prayer) => {
      const data = await idb.readData('prayers') || [];
      return idb.writeData('prayers', [prayers, ...data]);
    },
);

const initialState = {
  data: [] as Prayer[],
  loading: true,
};

const prayerSlice = createSlice({
  name: 'prayer',
  initialState,
  reducers: {},
  extraReducers: {
    [getPrayers.pending.type]: (state) => {
      state.loading = true;
    },
    [getPrayers.fulfilled.type]: (state, action) => {
      state.data = action.payload || [] as Prayer[];
      state.loading = false;
    },
    [addPrayer.fulfilled.type]: (state, action) => {
      state.data = action.payload as Prayer[];
    },
  },
});

export default prayerSlice.reducer;
