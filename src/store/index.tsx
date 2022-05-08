import React, { ReactNode } from "react";
import {useLocalStorageState} from 'ahooks'

export interface configProps {
    accessKey:string,
    secretKey:string,
    bucket:string
}

export const appContext = React.createContext({
    config:{
        accessKey:'',
        secretKey:'',
        bucket:''
    },
    setConfig:(newConfig:configProps)=>{}
})

export const AppProviders = ({children}:{children:ReactNode}) => {
    const [config,setConfig] = useLocalStorageState('YunSpace_Config',{
        defaultValue:{
            accessKey:'',
            secretKey:'',
            bucket:'',
        }
    })

    return (
        <appContext.Provider value={{config,setConfig}}>
            {children}
        </appContext.Provider>
    )
}

export const useAppContext = () => {
    const context = React.useContext(appContext)
    return context;
}