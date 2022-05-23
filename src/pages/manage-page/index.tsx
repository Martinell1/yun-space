import { useAppContext } from '../../store'
import React, { useEffect, useState } from 'react';
import { Button, Card, Image, message } from 'antd';
import SelectDir from '../../components/select-dir';
import './index.css'
import ImageExpand from '../../components/image-expand';

export default function ManagePage(){
    const {config,management,setManagement} = useAppContext()
    const [currentDir,setCurrentDir] = useState(config.dir)

    useEffect(()=>{
        console.log('change');
        
    },[management])

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
                                    <Card
                                        key={image.name}
                                        hoverable
                                        style={{margin:'0 20px 20px 0'}}
                                        bodyStyle={{
                                            padding:0
                                        }}
                                        cover={
                                            <Image
                                                style={{objectFit:'cover'}}
                                                src={image.url}
                                                width={200}
                                                height={140}
                                            />
                                        }>
                                        <ImageExpand 
                                            id={image.id} 
                                            dir={image.dir} 
                                            name={image.name} 
                                            url={image.url}
                                            deleteFn={()=>{
                                                management.map(dir => {
                                                    let index = -1
                                                    if(dir.dir === image.dir){
                                                        for(let i = 0 ; i < dir.imageList.length; i++){
                                                            if(dir.imageList[i].id === image.id){
                                                                index = i
                                                                break
                                                            }
                                                        }
                                                        dir.imageList.splice(index,1)
                                                    }
                                                    return dir
                                                })
                                                setManagement(management)
                                                message.success('删除成功')
                                            }}                                     
                                        />
                                    </Card>
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