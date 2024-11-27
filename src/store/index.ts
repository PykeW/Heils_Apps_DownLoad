import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./login/authSlice"


export const store = configureStore({
    reducer:{
        authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;