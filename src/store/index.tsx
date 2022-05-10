import React, { ReactNode } from "react";
import {useLocalStorageState} from 'ahooks'

export interface configProps {
    accessKey:string,
    secretKey:string,
    bucket:string,
    domain:string,
}

export interface managementProps {
    name:string,
    url:string
}

export const appContext = React.createContext({
    config:{
        accessKey:'',
        secretKey:'',
        bucket:'',
        domain:'',
    },
    setConfig:(newConfig:configProps)=>{},
    management:[{name:'',url:''}],
    setManagement:(newManagement:managementProps[])=>{},
})

export const AppProviders = ({children}:{children:ReactNode}) => {
    const [config,setConfig] = useLocalStorageState('YunSpace_Config',{
        defaultValue:{
            accessKey:'',
            secretKey:'',
            bucket:'',
            domain:'',
        }
    })

    const [management ,setManagement] = useLocalStorageState('YunSpace_Management',{
        defaultValue:[
            {name:'',url:''}
        ]
    })

    return (
        <appContext.Provider value={{config,setConfig,management,setManagement}}>
            {children}
        </appContext.Provider>
    )
}

export const useAppContext = () => {
    const context = React.useContext(appContext)
    return context;
}