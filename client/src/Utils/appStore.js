import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
//import storage from 'redux-persist/lib/storage/session'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    //whitelist:[reducer1]
}



/* const reducer1 = combineReducers(
    {collections: appReducer}
) */
/* const reducer1 ={collections: appReducer} */
const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore(
    {
      reducer:  persistedReducer, 
      devTools: process.env.NODE_ENV !== 'production',
        middleware: [thunk]

    }
  )

export const persistor = persistStore(store)

/* 
export const store = configureStore(
    {
      reducer:  {
        collections: appReducer
      }
    }
  ) */