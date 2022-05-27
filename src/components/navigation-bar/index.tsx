import './index.css'
import icon from '../../assets/images/icon.svg'

export default function NavigationBar() {

  return (
    <div className='navigation-bar'>
      <div className='navigation-bar-left'>
        <img className='logo' src={icon} alt="" width={48} height={48} />
        <div className='title'>Yun-Space</div>
      </div>
      {/* <Avatar size="large" icon={<UserOutlined />} /> */}
    </div>
  )
};
