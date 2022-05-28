import { Upload, Image, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useAppContext } from '../../store';
import axios from 'axios';
import { useState } from 'react';
const { Dragger } = Upload;

const uploadConfig = {
  multiple: true,
  accept:"image/*",
  showUploadList:false,
};

export default function UploadPage(){
    const {config,management,setManagement} = useAppContext()
    const [currentUrl,setCurrentUrl] = useState('')

    return (
        <div style={{padding:'20px 0'}}>
            <Dragger 
                {...uploadConfig}
                customRequest={
                  async (info)=>{    
                    const {data} = await axios.post('http://localhost:3001/getUploadToken',config)
                    const form = new FormData()
                    form.append('file',info.file)
                    form.append('token',data)
                    axios.post(`http://upload${config.area === 'z0' ? config.area : `-${config.area}`}.qiniup.com`,form)
                    .then(res=>{
                      const {key} = res.data
                      const url = `http://${config.domain}/${key}`;
                      let hasUpload = false
                      for(let i = 0 ; i < management.length ;i++){
                        const dir = management[i]
                        if(dir.dir === config.dir){
                          for(let j = 0 ; j < dir.imageList.length ; j++){
                            const img = dir.imageList[j];
                            if(img.id === key){
                              message.error('该图片已上传');
                              hasUpload = true
                              return
                            }
                          }
                        }
                      }

                      if(!hasUpload){
                        management.map(element=>{
                          if(element.dir === config.dir){
                            element.imageList.push({
                              dir:config.dir,
                              id:key,
                              name:key,
                              url
                            })
                          }
                          return element
                        })
                        setCurrentUrl(url)
                        setManagement(management)
                        message.success(`上传成功`)
                      }
                    })
                  }
                }>
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
                </p>
            </Dragger>
            {
              currentUrl !== '' ? 
              <Image
                style={{marginTop:'20px',objectFit:'cover'}}
                preview={false}
                src={currentUrl}
                height={'60vh'}
              /> : ''
            }
        </div>
    )
}