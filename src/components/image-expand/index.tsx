import { Button, Input, message, Tag, Tooltip } from "antd"
import { imageProps } from "../../store"
import { MediumOutlined,CopyOutlined } from '@ant-design/icons';
import { useState } from "react";
const ImageExpand = (props:imageProps)=>{
    const [isMarkDown,SetIsMarkDown] = useState(false)
    const clipboardObj = navigator.clipboard;
    return (
        <div style={{padding:'5px 0 11px 0'}}>
            <Input 
                bordered={false} 
                defaultValue={props.name} 
                onBlur={()=>{
                    console.log('失去焦点修改');
                    
                }}>
            </Input>
            <div
                style={{padding:'0 11px',display:'flex',justifyContent:'space-between'}}>
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
                       
                        message.success("已拷贝链接")
                    }}
                />
            </div>
        </div>
    )
}

export default ImageExpand