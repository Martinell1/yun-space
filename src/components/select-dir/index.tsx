import { Dropdown, Menu ,Input } from "antd"
import { useAppContext } from "../../store"

interface SelectProps {
    currentDir:string,
    setCurrentDir:Function
}

export default function SelectDir({currentDir,setCurrentDir}:SelectProps){
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
            <Input value={currentDir} />
        </Dropdown>
    )
}