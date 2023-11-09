import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterReducer';
import  RecallApiLoading  from './features/apiSave/recallApiLoading';

export default configureStore({
  reducer: {
    counter: counterReducer,
    apiSave: RecallApiLoading,
  }
})