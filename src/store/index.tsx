import React, { ReactNode } from "react";
import {useLocalStorageState} from 'ahooks'

export interface configProps {
    accessKey:string,
    secretKey:string,
    bucket:string,
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

export interface managementProps {
    dir:string,
    imageList:Array<imageProps>
}

export const appContext = React.createContext({
    config:{
        accessKey:'',
        secretKey:'',
        bucket:'',
        domain:'',
        dir:'',
        theme:''
    },
    setConfig:(newConfig:configProps)=>{},
    management:[{
        dir:'default',
        imageList:[] as Array<imageProps>
    }],
    setManagement:(newManagement:managementProps[])=>{},
})

export const AppProviders = ({children}:{children:ReactNode}) => {
    const [config,setConfig] = useLocalStorageState('YunSpace_Config',{
        defaultValue:{
            accessKey:'',
            secretKey:'',
            bucket:'',
            domain:'',
            dir:'/default',
            theme:'light'
        }
    })

    const [management ,setManagement] = useLocalStorageState('YunSpace_Management',{
        defaultValue:[{
            dir:'default',
            imageList:[] as Array<imageProps>
        }]
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