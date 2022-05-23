import { Button, Input, message, Tag, Tooltip } from "antd"
import { imageProps, useAppContext } from "../../store"
import { MediumOutlined,CopyOutlined } from '@ant-design/icons';
import { useState } from "react";
const ImageExpand = (props:imageProps)=>{
    const [isMarkDown,SetIsMarkDown] = useState(false)
    const {management,setManagement} = useAppContext()
    const clipboardObj = navigator.clipboard;
    return (
        <div style={{padding:'5px 0 11px 0'}}>
            <Input 
                bordered={false} 
                defaultValue={props.name} 
                onBlur={(e)=>{
                    management.forEach(item=>{
                        if(item.dir === props.dir){
                            item.imageList.forEach(pic=>{
                                if(pic.id === props.id){
                                    pic.name = e.target.value
                                }
                            })
                        }
                    })
                    setManagement(management);
                    message.success('修改成昆')
                }}>
            </Input>
            <div
                style={{padding:'4px 11px 0 11px',display:'flex',justifyContent:'space-between'}}>
                <Button 
                    type={isMarkDown ? 'primary' : 'default'}
                    size="small" 
                    icon={<MediumOutlined />} 
                    onClick={()=>{
                        SetIsMarkDown(!isMarkDown)
                    }}/>
                <Button 
                    size="small" 
                    icon={<CopyOutlined />}
                    onClick={() => {
                        if(isMarkDown){
                            clipboardObj.writeText(`![${props.name}](${props.url})`);
                        }else{
                            clipboardObj.writeText(props.url);
                        }
                       
                        message.success(`已拷贝${isMarkDown ? 'Markdown' : ''}链接`)
                    }}
                />
            </div>
        </div>
    )
}

export default ImageExpand