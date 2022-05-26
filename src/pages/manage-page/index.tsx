import { useAppContext } from '../../store'
import { useState } from 'react';
import { Button, Card, Image, message, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import SelectDir from '../../components/select-dir';
import './index.css'
import ImageExpand from '../../components/image-expand';

export default function ManagePage(){
    const {config,setConfig,management,setManagement} = useAppContext()
    const [currentDir,setCurrentDir] = useState(config.dir)


    return (
        <div style={{padding:'20px 0'}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <SelectDir currentDir={currentDir} setCurrentDir={setCurrentDir} children={<Button style={{marginBottom:'20px'}}>{currentDir}</Button>}></SelectDir>
            <Popconfirm 
                    title="确认删除?" 
                    icon={<QuestionCircleOutlined 
                        style={{ color: 'red' }}/>
                    }
                    onConfirm ={()=>{
                        if(currentDir === 'default'){
                            message.error('无法删除默认目录')
                            return
                        }
                        const newManagement = management.filter(item=>{
                            return item.dir !== currentDir
                        })
                        config.dir = 'default'
                        setConfig({...config})
                        setCurrentDir('dedfault')
                        setManagement(newManagement)
                        message.success('删除成昆')
                    }}
                    placement="bottomRight"
                >
                    <Button danger>删除</Button>
            </Popconfirm>
        </div>
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
                                                setManagement([...management])
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