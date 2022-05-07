import { Menu } from 'antd';
import { MailOutlined,SettingOutlined,FormOutlined,CloudUploadOutlined,AppstoreOutlined } from '@ant-design/icons';
import { FC,useState } from 'react';
const items = [
  {
    label: '图床配置',
    key: '1',
    icon: <FormOutlined />,
  },
  {
    label: '上传图片',
    key: '2',
    icon: <CloudUploadOutlined />,
  },
  {
    label: '图床管理',
    key: '3',
    icon: <AppstoreOutlined />,
  },
  {
    label: '我的设置',
    key: '4',
    icon: <SettingOutlined />,
  },
  {
    label: '帮助反馈',
    key: '5',
    icon: <MailOutlined />,
  },
];

const MenuLeft:FC = () => {
  const [current, setCurrent] = useState('1');

  const onClick = (e:any) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} items={items} />;
};

export default MenuLeft;