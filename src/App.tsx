import { Layout } from 'antd';
import './App.css';
import NavigationBar from './components/navigation-bar';
import MenuLeft from './components/menu-left';
import { Route, Routes } from 'react-router-dom';
import UploadPage from './pages/upload-page';
import DeployPage from './pages/deploy-page';
import ManagePage from './pages/manage-page';
import SettingPage from './pages/setting-page';
import FeedbackPage from './pages/feedback-page';
import BreadcrumbTop from './components/breadcrumb-top';
import { useAppContext } from './store';
import "./theme/custom-default.css";    // 引入custom-default.css 以及 custom-dark.css
import "./theme/custom-dark.css";
import { ConfigProvider } from "antd";
import { useEffect, useState } from 'react';
const { Header, Content, Sider } = Layout;

function App() {
  const {config} = useAppContext()
  const [theme, setTheme] = useState(config.theme === 'light' ? 'custom-default' : 'custom-dark');

  useEffect(()=>{
    setTheme(config.theme === 'light' ? 'custom-default' : 'custom-dark')
  },[config.theme])
  
  return (
    <ConfigProvider prefixCls={theme}>
      <Layout>
        <Header className="header">
          <NavigationBar></NavigationBar>
        </Header>
        <Content style={{ 
          padding: '0 50px 50px 50px',
          }}>
          <BreadcrumbTop></BreadcrumbTop>
          <Layout>
            <Sider width={200}>
              <MenuLeft></MenuLeft>
            </Sider>
            <Content style={{ 
                marginLeft:'24px',
                padding: '0 24px', 
                minHeight:'calc(100vh - 64px - 4px - 100px)',
                background:config.theme  === 'light' ? 'white' : '#1f1f1f'
                }}>
              <Routes>
                <Route index element={<ManagePage />} />
                <Route path='/deploy' element={<DeployPage/>}></Route>
                <Route path='/upload' element={<UploadPage/>}></Route>
                <Route path='/manage' element={<ManagePage/>}></Route>
                <Route path='/setting' element={<SettingPage/>}></Route>
                <Route path='/feedback' element={<FeedbackPage/>}></Route>
              </Routes>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </ConfigProvider>

  );
}

export default App;
