import { Form, Input, Button, Radio , message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import SelectDir from '../../components/select-dir';

import { configProps ,imageProps,managementProps,useAppContext } from '../../store';

interface deployProps extends configProps{
  catalogType?:number
}

export default function DeployPage(){
    const {config,setConfig,management,setManagement} = useAppContext()
    const onFinish = (newConfig:deployProps) => {
        if(newConfig.catalogType === 1){
            newConfig.dir = 'default'
        }else if(newConfig.catalogType === 2){
            newConfig.dir = currentDir
        }else if(newConfig.catalogType === 3){
            const dirs = management.map((managementItem:managementProps)=>{
                return managementItem['dir']
            })
            if(dirs.includes(newConfig.dir)){
                message.error('该目录已存在')
                return
            }

            management.push({
                'dir':newConfig.dir,
                'imageList':[] as Array<imageProps>
            })
            setManagement(management)
        }
        newConfig.theme = config.theme
        delete newConfig.catalogType
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
            initialValues={
                {catalogType,...config}
            }
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
                    onChange={({target})=>{
                        setCatalogType(target.value)              
                    }}
                    >
                    <Radio value={1}>默认</Radio>
                    <Radio value={2}>选择目录</Radio>
                    <Radio value={3}>新建目录</Radio>
                </Radio.Group>
            </Form.Item>
            {
                catalogType === 2 
                    ?   <Form.Item label="选择目录" name='dir'>
                            <SelectDir currentDir={currentDir} setCurrentDir={setCurrentDir}></SelectDir>
                        </Form.Item> 
                    :   catalogType === 3 
                        ?   <Form.Item label="新建目录" name='dir'>
                                <Input placeholder="请输入新目录名"/>
                            </Form.Item> 
                        :   null
            }
            <Form.Item  wrapperCol={{ offset:1 }}>
                <Button type="primary" htmlType="submit">
                    完成配置
                </Button>
            </Form.Item>
        </Form>
    )
}