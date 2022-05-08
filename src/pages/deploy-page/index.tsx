import { Form, Input, Button } from 'antd';

import { useAppContext } from '../../store';
export default function DeployPage(){
    const {config,setConfig} = useAppContext()
    console.log(config);
    
    const onFinish = (newConfig:any) => {
        console.log(newConfig);
        setConfig(newConfig)
    }
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
            <Form.Item  wrapperCol={{ offset:1 }}>
                <Button type="primary" htmlType="submit">
                    完成配置
                </Button>
            </Form.Item>
        </Form>
    )
}