import { Dropdown, Menu ,Input } from "antd"
import { Children, ReactNode } from "react"
import { useAppContext } from "../../store"

interface SelectProps {
    currentDir:string,
    setCurrentDir:Function,
    children?:ReactNode
}

export default function SelectDir({currentDir,setCurrentDir,children}:SelectProps){
    const {management} = useAppContext()

    return (
        <Dropdown 
            overlay={
                <Menu 
                    items={management.map(element=>{
                        return {
                            label:element.dir,
                            key:element.dir
                        }
                    })} 
                    onClick={(e)=>{
                        setCurrentDir(e.key)                
                    }} 
                />
            } 
            placement="bottomRight" 
            arrow>
            {
                children == null ? <Input value={currentDir}/> : children
            }
        </Dropdown>
    )
}