import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { journalSlice } from './journal'

export const store = configureStore({
  reducer: {
    //Creo el espacio auth en el store
    auth: authSlice.reducer,
    journal: journalSlice.reducer
  },
})