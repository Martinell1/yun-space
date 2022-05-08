import {Breadcrumb} from 'antd'
import { useLocation } from 'react-router-dom'
export default function BreadcrumbTop(){
    const location = useLocation()

    return (
        <Breadcrumb style={{ margin: '16px' }}>
            <Breadcrumb.Item>Yun-Space</Breadcrumb.Item>
            <Breadcrumb.Item>{location.pathname}</Breadcrumb.Item>
            {
                ['/manage','/upload'].includes(location.pathname) ? <Breadcrumb.Item>App</Breadcrumb.Item> : ''
            }
        </Breadcrumb>
    )
}