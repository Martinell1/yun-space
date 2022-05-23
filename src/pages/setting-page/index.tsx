import { Button, Dropdown , Menu, Switch } from "antd";
import { useAppContext } from "../../store";
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
    
    const {config,setConfig} = useAppContext()
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
                                setConfig(config)
                            }}
                        />
                    } 
                    placement="bottomLeft" 
                    arrow>
                    <Button style={{marginBottom:'20px'}}>{currentTheme === 'light' ? '白昼模式' : '夜间模式'}</Button>
                </Dropdown>
            </div>

        </div>
    )
}