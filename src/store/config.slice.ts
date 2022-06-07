import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "."

interface State {
  accessKey:string,
  secretKey:string,
  bucket:string,
  area:string,
  domain:string,
  dir:string,
  theme:string,
}

const initialState:State = JSON.parse(localStorage.getItem('YunSpace_Config')!)

export const configSlice = createSlice({
  name:'configSlice',
  initialState,
  reducers: {
    setConfig(state:State,action: { payload: State }){
      state =  action.payload
      localStorage.setItem('YunSpace_Config',JSON.stringify(state))
    },
    setTheme(state:State,action: { payload: string }){
      state.theme = action.payload
      localStorage.setItem('YunSpace_Config',JSON.stringify(state))
    }
  }
})

export const configActions = configSlice.actions

export const selectConfig = (state:RootState) => state.config