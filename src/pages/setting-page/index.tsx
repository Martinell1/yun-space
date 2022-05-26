import { Button, Dropdown , Menu, message, Upload } from "antd";
import { managementProps, useAppContext } from "../../store";
import { FormOutlined,CloudUploadOutlined } from '@ant-design/icons';
import { useState } from "react";

const items = [
    {
      label: '白昼模式',
      key: 'light',
      icon: <FormOutlined />,
    },
    {
      label: '夜间模式',
      key: 'dark',
      icon: <CloudUploadOutlined />,
    },
];

export default function SettingPage(){
    
    const {config,setConfig,management,setManagement} = useAppContext()
    const [currentTheme,setCurrentTheme] = useState(config.theme)

    return (
        <div style={{padding:'20px 0'}}>
            <div>
                <Dropdown 
                    overlay={
                        <Menu 
                            items={items}
                            onClick={(e)=>{
                                config.theme = e.key
                                setCurrentTheme(e.key)
                                setConfig({...config})
                            }}
                        />
                    } 
                    placement="bottomLeft" 
                    arrow>
                    <Button style={{marginBottom:'20px'}}>{currentTheme === 'light' ? '白昼模式' : '夜间模式'}</Button>
                </Dropdown>
            </div>
            <Button 
                onClick={()=>{
                    let blob = new Blob([JSON.stringify(management, null, 2)], {type : 'application/json'});
                    console.log(blob);
                    var url = URL.createObjectURL(blob);
                    // 创建a标签，用于跳转至下载链接
                    const tempLink = document.createElement('a')
                    tempLink.style.display = 'none'
                    tempLink.href = url
                    tempLink.setAttribute('download', decodeURI(new Date().toLocaleDateString()))
                    // 兼容：某些浏览器不支持HTML5的download属性
                    if (typeof tempLink.download === 'undefined') {
                        tempLink.setAttribute('target', '_blank')
                    }
                    // 挂载a标签
                    document.body.appendChild(tempLink);
                    tempLink.click()
                    document.body.removeChild(tempLink);
                    // 释放blob URL地址
                    window.URL.revokeObjectURL(url);
                }}>导出配置
            </Button>
            <Upload
                accept=".json"
                showUploadList={false}
                customRequest={(e)=>{
                    let reader = new FileReader();
                    reader.onload = ()=>{
                        const newManagement = JSON.parse(reader.result as string);
                        const dirs = newManagement.map((management:managementProps)=>{
                            return management['dir']
                        })
                        if(!dirs.includes(config.dir)){
                            config.dir = 'default'
                            setConfig({...config})
                        }
                        setManagement(newManagement)
                        message.success('导入成昆')
                    }
                    reader.readAsText(e.file as Blob)
                }}
            >
                <Button style={{marginLeft:'20px'}}>导入配置</Button>
            </Upload>
        </div>
    )
}