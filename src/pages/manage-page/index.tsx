import { useAppContext } from '../../store'
import React, { useState } from 'react';
import { Button, Image } from 'antd';
import SelectDir from '../../components/select-dir';
import './index.css'

export default function ManagePage(){
    const {config,management} = useAppContext()
    const [currentDir,setCurrentDir] = useState(config.dir)
    return (
        <div style={{padding:'20px 0'}}>
        <SelectDir currentDir={currentDir} setCurrentDir={setCurrentDir} children={<Button style={{marginBottom:'20px'}}>{currentDir}</Button>}></SelectDir>
        {
            management.map((dir,index) => {
                return (
                    <div key={index}
                        style={{
                            display:'flex',
                            flexWrap:'wrap'
                        }}>
                        {
                            dir.dir === currentDir ?
                            dir.imageList.map((image)=>{
                                return (
                                    <div style={{margin:'0 20px 20px 0'}}>
                                        <Image
                                            key={image.name}
                                            style={{objectFit:'cover'}}
                                            src={image.url}
                                            width={200}
                                            height={140}
                                            onClick={() => {
                                                console.log('触发');
                                            }}
                                        /> 
                                    </div>
                                )
                            })
                            : null
                        }
                    </div>
                )
            })
        }
        </div>
    )
}