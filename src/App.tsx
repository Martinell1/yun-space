import { Layout } from 'antd';

import './App.css';
import MenuTop from './components/navigation-bar';
import MenuLeft from './components/menu-left';

const { Header, Content, Sider } = Layout;

function App() {
  return (
    <Layout>
      <Header className="header">
        <MenuTop></MenuTop>
      </Header>
      <Content style={{ padding: '0 50px'}}>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <MenuLeft></MenuLeft>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight:'calc(100vh - 64px - 100px)' }}>Content</Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default App;
