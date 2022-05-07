import { Form, Input, Button, Radio } from 'antd';
export default function DeployPage(){
    return (
        <Form>
            <Form.Item label="Field A">
                <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Field B">
                <Input placeholder="input placeholder" />
            </Form.Item>
        </Form>
    )
}