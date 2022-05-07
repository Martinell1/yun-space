import { Form, Input } from 'antd';
import { useEffect, useState } from 'react';
export default function DeployPage(){
    const [form,setForm] = useState({
        accessKey:'',
        secretKey:'',
        bucket:'',
    })
    
    useEffect(()=>{
        setForm({
            accessKey:'GHtgzdXyBwen6ktRdnM3TruspfORzrqpJcQdOnOj',
            secretKey:'ljJdPY5eSiV6nWwNkEgsNnhBqNZ3J3DqDOk8drGS',
            bucket:'light-hub',
        })
    },[])
    return (
        <Form
            style={{padding:'20px'}}
            colon={false}
            labelCol={{ span: 1 }}
            initialValues={form}
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
        </Form>
    )
}