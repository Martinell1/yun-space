import { Layout } from 'antd';
import './App.css';
import MenuTop from './components/navigation-bar';
import MenuLeft from './components/menu-left';
import { Route, Routes } from 'react-router-dom';
import UploadPage from './pages/upload-page';
import DeployPage from './pages/deploy-page';
import ManagePage from './pages/manage-page';
import SettingPage from './pages/setting-page';
import FeedbackPage from './pages/feedback-page';
import BreadcrumbTop from './components/breadcrumb-top';

const { Header, Content, Sider } = Layout;

function App() {
  return (
    <Layout>
      <Header className="header">
        <MenuTop></MenuTop>
      </Header>
      <Content style={{ padding: '0 50px 50px 50px'}}>
        <BreadcrumbTop></BreadcrumbTop>
        <Layout className="site-layout-background">
          <Sider className="site-layout-background sider" width={200}>
            <MenuLeft></MenuLeft>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight:'calc(100vh - 64px - 4px - 100px)' }}>
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
  );
}

export default App;
