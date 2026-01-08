import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Layout, Button } from 'antd';
import { LogoutOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';

import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { FILE_BASE_URL } from '@/config/serverApiConfig';
import useLanguage from '@/locale/useLanguage';

import UpgradeButton from './UpgradeButton';

export default function HeaderContent() {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const { Header } = Layout;
  const translate = useLanguage();
  const navigate = useNavigate();

  const ProfileDropdown = () => (
    <div
      onClick={() => navigate('/profile')}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        cursor: 'pointer',
      }}
    >
      <Avatar
        size={44}
        src={currentAdmin?.photo ? FILE_BASE_URL + currentAdmin.photo : undefined}
        style={{
          backgroundColor: currentAdmin?.photo ? 'transparent' : '#fde3cf',
        }}
      >
        {currentAdmin?.name?.charAt(0)?.toUpperCase()}
      </Avatar>

      <div style={{ lineHeight: 1.3 }}>
        <div style={{ fontWeight: 600 }}>
          {currentAdmin?.name} {currentAdmin?.surname}
        </div>
        <div style={{ fontSize: 12, color: '#8c8c8c' }}>
          {currentAdmin?.email}
        </div>
      </div>
    </div>
  );

  const items = [
    {
      label: <ProfileDropdown />,
      key: 'profilePreview',
    },
    { type: 'divider' },
    {
      icon: <UserOutlined />,
      key: 'profile',
      label: <Link to="/profile">{translate('profile_settings')}</Link>,
    },
    {
      icon: <ToolOutlined />,
      key: 'settings',
      label: <Link to="/settings">{translate('app_settings')}</Link>,
    },
    { type: 'divider' },
    {
      icon: <LogoutOutlined />,
      key: 'logout',
      label: <Link to="/logout">{translate('logout')}</Link>,
    },
  ];

  return (
    <Header
      style={{
        height: 72,
        padding: '0 32px',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      {/* LEFT SIDE (future: breadcrumbs / page title) */}
      <div />

      {/* RIGHT SIDE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <UpgradeButton />

        <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
          <Avatar
            size={40}
            src={currentAdmin?.photo ? FILE_BASE_URL + currentAdmin.photo : undefined}
            style={{
              cursor: 'pointer',
              backgroundColor: currentAdmin?.photo ? 'transparent' : '#fde3cf',
            }}
          >
            {currentAdmin?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
        </Dropdown>
      </div>
    </Header>
  );
}
