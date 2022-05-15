import { Form, Input, Button, Radio ,Dropdown, Menu, message } from 'antd';
import { useState } from 'react';

import { configProps ,imageProps,useAppContext } from '../../store';

interface deployProps extends configProps{
  catalogType:number
}

export default function DeployPage(){
    const {config,setConfig,management,setManagement} = useAppContext()
    const onFinish = (newConfig:deployProps) => {
        if(newConfig.catalogType === 1){
            newConfig.dir = 'default'
        }else if(newConfig.catalogType === 3){
            management.push({
                'dir':newConfig.dir,
                'imageList':[] as Array<imageProps>
            })
            setManagement(management)
        }
        
        setConfig(newConfig)
        message.success(`配置成功`)

    }

    const [catalogType,setCatalogType] = useState(2)
    const [currentDir,setCurrentDir] = useState(config.dir)
    return (
        <Form
            style={{padding:'20px'}}
            colon={false}
            labelCol={{ span: 1 }}
            initialValues={config}
            onFinish={onFinish}
            >
            <Form.Item label="accessKey" name='accessKey'>
                <Input  placeholder="请输入accessKey"/>
            </Form.Item>
            <Form.Item label="secretKey" name='secretKey'>
                <Input placeholder="请输入secretKey"/>
            </Form.Item>
            <Form.Item label="bucket" name='bucket'>
                <Input placeholder="请输入bucket"/>
            </Form.Item>
            <Form.Item label="domain" name='domain'>
                <Input placeholder="请输入域名"/>
            </Form.Item>
            <Form.Item label="选择目录" name='catalogType'>
                <Radio.Group 
                    value={catalogType}
                    onChange={({target})=>{
                        setCatalogType(target.value)              
                    }}
                    >
                    <Radio value={1}>默认</Radio>
                    <Radio value={2}>选择目录</Radio>
                    <Radio value={3}>新建</Radio>
                </Radio.Group>
            </Form.Item>
            {
                catalogType === 2 
                    ?   <Form.Item label="选择目录" name='dir'>
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
                        </Form.Item> 
                    :   catalogType === 3 
                        ?   <Form.Item label="新建目录" name='dir'>
                                <Input placeholder="请输入新目录名"/>
                            </Form.Item> 
                        :   ''
            }
            <Form.Item  wrapperCol={{ offset:1 }}>
                <Button type="primary" htmlType="submit">
                    完成配置
                </Button>
            </Form.Item>
        </Form>
    )
}