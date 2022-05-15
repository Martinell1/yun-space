import { useAppContext } from '../../store'
import React, { useState } from 'react';
import { Image } from 'antd';
import './index.css'

export default function ManagePage(){
    const {management,setManagement} = useAppContext()
    const [visible, setVisible] = useState(false);
    return (
        <div style={{paddingTop:'20px'}}>
        <Image
          style={{objectFit:'cover'}}
          src={management[management.length-1].url}
          preview={{ visible: false }}
          width={200}
          height={140}
          onClick={() => setVisible(true)}
        />
        <div style={{ display: 'none' }}>
          <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
            {
                management.map((item)=>{
                    return (
                        <Image key={item.name} src={item.url} />
                    )
                })
            }
          </Image.PreviewGroup>
        </div>
      </div>
    )
}