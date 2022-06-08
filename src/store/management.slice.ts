import { createSlice } from "@reduxjs/toolkit"
import { imageProps, RootState } from "."

interface State {
  dir:string,
  imageList:Array<imageProps>
}

const initialState:State[] = JSON.parse(localStorage.getItem('YunSpace_Management')!)

export const managementSlice = createSlice({
  name:'managementSlice',
  initialState,
  reducers: {
    setManagement(state:State[],action: { payload: State[] }){
      state =  action.payload
      localStorage.setItem('YunSpace_Management',JSON.stringify(state))
    },
    pushImage(state:State[],action: { payload: imageProps }){
      state.forEach(item=>{
        if(item.dir === action.payload.dir){
          item.imageList.push(action.payload)
        }
      })
      localStorage.setItem('YunSpace_Management',JSON.stringify(state))
    },
    renameManagement(state:State[],action:{payload:any}){
      const {oldName,newName} = action.payload
      state.forEach(item=>{
        if(item.dir === oldName){
          item.dir = newName
          item.imageList.forEach(image => {
            image.dir = newName
          })
        }
      })
      localStorage.setItem('YunSpace_Management',JSON.stringify(state))
    },
    renameImage(state:State[],action:{payload:any}){
      const {dir,imageId,imageName} = action.payload
      state.forEach(item=>{
        if(item.dir === dir){
            item.imageList.forEach(pic=>{
                if(pic.id === imageId){
                    pic.name = imageName
                }
            })
        }
      })
      localStorage.setItem('YunSpace_Management',JSON.stringify(state))
    }
  }
})

export const managementActions = managementSlice.actions

export const selectManagement = (state:RootState) => state.management