import React, { ReactNode } from "react";
import {useLocalStorageState} from 'ahooks'

export const appContext = React.createContext({
    config:{},
    setConfig:(newConfig:any)=>{}
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