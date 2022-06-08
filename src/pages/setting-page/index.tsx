import { Button, Dropdown , Menu, message, Upload } from "antd";
import { FormOutlined,CloudUploadOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { configActions, selectConfig } from "../../store/config.slice";
import { managementActions, selectManagement } from "../../store/management.slice";
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
    
    const config = useSelector(selectConfig)
    const management = useSelector(selectManagement)
    const dispatch = useDispatch()
    const [currentTheme,setCurrentTheme] = useState(config.theme)

    return (
        <div style={{padding:'20px 0'}}>
            <div>
                <Dropdown 
                    overlay={
                        <Menu 
                            items={items}
                            onClick={(e)=>{
                                setCurrentTheme(e.key)
                                dispatch(configActions.setTheme(e.key))
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
                    const newConfig = {
                        config,
                        management
                    }     
                    let blob = new Blob([JSON.stringify(newConfig, null, 2)], {type : 'application/json'});
                    console.log(blob);
                    var url = URL.createObjectURL(blob);
                    // 创建a标签，用于跳转至下载链接
                    const tempLink = document.createElement('a')
                    tempLink.style.display = 'none'
                    tempLink.href = url
                    tempLink.setAttribute('download', decodeURI(config.bucket+"_"+new Date().toLocaleDateString()))
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
                        const {config : newConfig,management : newManagement} = JSON.parse(reader.result as string);
                        console.log(config,management);
                        dispatch(configActions.setConfig(newConfig))
                        dispatch(managementActions.setManagement(newManagement))
                        message.success('导入成昆')
                        window.location.reload()
                    }
                    reader.readAsText(e.file as Blob)
                }}
            >
                <Button style={{marginLeft:'20px'}}>导入配置</Button>
            </Upload>
        </div>
    )
}