import s3_access from '../modules/s3_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    's3/get',
    async () => {
      const response = await s3_access.getAsync();
      return response;
    }
  );

export const uploadAsync = createAsyncThunk(
    's3/create',
    async (entity) => {
      const response = await s3_access.uploadAsync(entity);
      return response;
    }
);

export const deleteAsync = createAsyncThunk(
    's3/delete',
    async (entity) => {
      const response = await s3_access.deleteAsync(entity);
      return response;
    }
);

export const s3Slice = createSlice({
        name: 's3',
        initialState: {
            values: [],
            status: "idle",
            url: s3_access.api
        },
        reducers: {
        },
        extraReducers: (builder) => {
            builder
              .addCase(getAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload) {
                    state.values = action.payload;
                  }
                  else {
                      state.values = [];
                  }
              })
              .addCase(uploadAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(uploadAsync.fulfilled, (state) => {
                state.status = 'idle';
                return state;
              })
              .addCase(deleteAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(deleteAsync.fulfilled, (state) => {
                state.status = 'idle';
                return state;
              });
          },
    }
);


export const selectValues = (state) => state.s3.values;
export const selectStatus = (state) => state.s3.status;
export const selectUrl = (state) => state.s3.url;

export default s3Slice.reducer