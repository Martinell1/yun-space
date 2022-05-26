import { Menu } from 'antd';
import { MailOutlined,SettingOutlined,FormOutlined,CloudUploadOutlined,AppstoreOutlined } from '@ant-design/icons';
import { FC,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../store';

const items = [
  {
    label: '图床配置',
    key: 'deploy',
    icon: <FormOutlined />,
  },
  {
    label: '上传图片',
    key: 'upload',
    icon: <CloudUploadOutlined />,
  },
  {
    label: '图床管理',
    key: 'manage',
    icon: <AppstoreOutlined />,
  },
  {
    label: '我的设置',
    key: 'setting',
    icon: <SettingOutlined />,
  },
  {
    label: '帮助反馈',
    key: 'feedback',
    icon: <MailOutlined />,
  },
];

const MenuLeft:FC = () => {
  const [current, setCurrent] = useState('manage');

  const navigate = useNavigate()
  const onClick = (e:any) => {
    navigate('/'+e.key);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} items={items} />;
};

export default MenuLeft;