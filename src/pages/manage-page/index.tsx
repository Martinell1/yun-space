import { useAppContext } from '../../store'
import React, { useState } from 'react';
import { Image } from 'antd';
import './index.css'

export default function ManagePage(){
    const {config,management} = useAppContext()
    const [currentDir,setCurrentDir] = useState(config.dir)
    return (
        <div style={{padding:'20px 0'}}>
        {
            management.map((dir,index) => {
                return (
                    <div>
                        {
                            dir.dir === currentDir ?
                            dir.imageList.map((image)=>{
                                return (
                                    <Image
                                        style={{objectFit:'cover'}}
                                        src={image.url}
                                        width={200}
                                        height={140}
                                        onClick={() => {
                                        }}
                                    /> 
                                )
                            })
                            : ''
                        }
                    </div>
                )
            })
        }
        </div>
    )
}