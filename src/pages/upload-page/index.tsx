import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useAppContext } from '../../store';
import axios from 'axios';

const { Dragger } = Upload;

const uploadConfig = {
  multiple: true,
  accept:"image/*",
  onDrop(e:any) {
    console.log('Dropped files', e.dataTransfer.files);
  }
};

export default function UploadPage(){
    const {config} = useAppContext()

    return (
        <div style={{padding:'20px'}}>
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
                      console.log('http://qiniu.kaijinx.top/'+key);
                      
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
        </div>
    )
}