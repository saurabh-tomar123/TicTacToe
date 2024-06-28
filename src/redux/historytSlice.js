// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState:{
    history: []
  },
  reducers: {
    increment: (state, action) => {
        let dataLength = state.history.length
        let data = {"date": new Date(),  "winner": action.payload}
        state.history[dataLength] = data
    }
            
    // decrement: (state) => state - 1,
    // incrementByAmount: (state, action) => state + action.payload,
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
