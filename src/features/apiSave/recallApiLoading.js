import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const api = 'https://64e5f67f09e64530d17f54dc.mockapi.io/getInfo';

export const fetchUserById = createAsyncThunk("fetch", async (number) => {
    const data = await fetch(api);
    return data.json();
});

export const fetchById = createAsyncThunk("fetch2", async (id) => {
    const data = await fetch(api+`/${id}`);
    return data.json();
});

export const RecallApiLoading = createSlice(
    {
        name: 'apiSave',
        // gia tri state ban dau
        initialState: {
            responApi: null,
            apiItemId: null
        },
        // reducer con có các hàm tính toán dùng để thay đổi hay update state của reducer đó
        reducers: {
            callApi: (state, action) => {
               //
            },
        },
        extraReducers: (builder) => {
            // Add reducers for additional action types here, and handle loading state as needed
            builder.addCase(fetchUserById.fulfilled, (state, action) => {
              // Add user to the state array
              console.log('action.payload', action.payload)
              state.responApi =  action.payload;
            }),
             // Add reducers for additional action types here, and handle loading state as needed
             builder.addCase(fetchById.fulfilled, (state, action) => {
                // Add user to the state array
                console.log('action.apiItemId', action.payload)
                state.apiItemId =  action.payload;
              })
          },
    }
)

export const { callApi } = RecallApiLoading.actions
export default RecallApiLoading.reducer;