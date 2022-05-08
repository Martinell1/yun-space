import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { configProps, useAppContext } from '../../store';
import { useRequest } from 'ahooks';
import axios from 'axios';

const getUploadToken = (config:configProps)=>{
  return axios.post('http://localhost:3001/getUploadToken',config)
  .then(res=>{
    const {data} = res
    return data
  })
}

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'http://upload-cn-east-2.qiniup.com',
  async onChange(info:any) {
    const { status } = info.file;
    console.log(status);
    if(status === 'uploading'){
      const config = JSON.parse(localStorage.getItem('YunSpace_Config')!)
      const token = await getUploadToken(config)
    }
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e:any) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};


export default function UploadPage(){
    const {config} = useAppContext()

    return (
        <div style={{padding:'20px'}}>
            <Dragger {...props}
                accept="image/*">
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