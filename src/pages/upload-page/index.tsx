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
    const [current_url,setCurrentUrl] = useState('')

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
                    axios.post('http://upload-cn-east-2.qiniup.com',form)
                    .then(res=>{
                      const {key} = res.data
                      message.success(`上传成功`)
                      const url = `http://${config.domain}/${key}`;
                    
                      console.log(management);
                      management.map(element=>{
                        if(element.dir === config.dir){
                          element.imageList.push({
                            dir:config.dir,
                            name:key,
                            url
                          })
                        }
                      })
                      setCurrentUrl(url)
                      setManagement(management)
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
              current_url !== '' ? 
              <Image
                style={{marginTop:'20px',objectFit:'cover'}}
                preview={false}
                src={current_url}
                height={'60vh'}
              /> : ''
            }
        </div>
    )
}