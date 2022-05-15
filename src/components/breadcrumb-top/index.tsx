import {Breadcrumb} from 'antd'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../../store'

export default function BreadcrumbTop(){
    const location = useLocation()
    const {config} = useAppContext()
    return (
        <Breadcrumb style={{ margin: '16px' }}>
            <Breadcrumb.Item>Yun-Space</Breadcrumb.Item>
            <Breadcrumb.Item>{location.pathname.slice(1)}</Breadcrumb.Item>
            {
                ['/manage','/upload'].includes(location.pathname) 
                    ? <Breadcrumb.Item>{config.dir}</Breadcrumb.Item> 
                    : ''
            }
        </Breadcrumb>
    )
}