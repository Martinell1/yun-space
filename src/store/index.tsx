import { configureStore } from "@reduxjs/toolkit";
import { configSlice } from "./config.slice";
import { managementSlice } from "./management.slice";


export interface configProps {
    accessKey:string,
    secretKey:string,
    bucket:string,
    area:string,
    domain:string,
    dir:string,
    theme:string,
}

export interface imageProps {
    dir:string,
    name:string,
    id:string,
    url:string,
}

export const rootReducer = {
    config:configSlice.reducer,
    management:managementSlice.reducer,
}

export const store = configureStore({
    reducer:rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>