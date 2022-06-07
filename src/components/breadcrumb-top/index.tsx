import {Breadcrumb} from 'antd'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { selectConfig } from '../../store/config.slice'

export default function BreadcrumbTop(){
    const location = useLocation()
    const config = useSelector(selectConfig)
    return (
        <Breadcrumb style={{ margin: '16px' }}>
            <Breadcrumb.Item>Yun-Space</Breadcrumb.Item>
            <Breadcrumb.Item>{location.pathname.slice(1)}</Breadcrumb.Item>
            {
                ['/upload'].includes(location.pathname) 
                    ? <Breadcrumb.Item>{config.dir}</Breadcrumb.Item> 
                    : ''
            }
        </Breadcrumb>
    )
}