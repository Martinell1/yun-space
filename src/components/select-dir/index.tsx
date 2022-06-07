import { Dropdown, Menu ,Input } from "antd"
import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { selectManagement } from "../../store/management.slice"

interface SelectProps {
    currentDir:string,
    setCurrentDir:Function,
    children?:ReactNode
}

export default function SelectDir({currentDir,setCurrentDir,children}:SelectProps){
    const management = useSelector(selectManagement)

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