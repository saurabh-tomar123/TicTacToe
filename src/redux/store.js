// // src/store.js
// import { configureStore } from '@reduxjs/toolkit';

// export const store = configureStore({
//   reducer: {
//     // Add your reducers here
//   },
// });
import { configureStore } from '@reduxjs/toolkit';
import HistoryReducer from './historytSlice';

export const store = configureStore({
  reducer: {
    counter: HistoryReducer,
  },
});