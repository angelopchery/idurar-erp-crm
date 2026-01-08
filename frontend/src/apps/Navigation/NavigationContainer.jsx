import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  CustomerServiceOutlined,
  ContainerOutlined,
  FileSyncOutlined,
  CreditCardOutlined,
  WalletOutlined,
  ShopOutlined,
  SettingOutlined,
  ReconciliationOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import { useAppContext } from '@/context/appContext';
import useLanguage from '@/locale/useLanguage';
import useResponsive from '@/hooks/useResponsive';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();
  return isMobile ? <MobileSidebar /> : <DesktopSidebar />;
}

function DesktopSidebar() {
  const location = useLocation();
  const translate = useLanguage();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;

  const [selectedKey, setSelectedKey] = useState('dashboard');

  useEffect(() => {
    if (location.pathname === '/') {
      setSelectedKey('dashboard');
    } else {
      setSelectedKey(location.pathname.slice(1));
    }
  }, [location.pathname]);

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: <Link to="/">{translate('dashboard')}</Link> },
    { key: 'customer', icon: <CustomerServiceOutlined />, label: <Link to="/customer">{translate('customers')}</Link> },
    { key: 'invoice', icon: <ContainerOutlined />, label: <Link to="/invoice">{translate('invoices')}</Link> },
    { key: 'quote', icon: <FileSyncOutlined />, label: <Link to="/quote">{translate('quote')}</Link> },
    { key: 'payment', icon: <CreditCardOutlined />, label: <Link to="/payment">{translate('payments')}</Link> },
    { key: 'payment/mode', icon: <WalletOutlined />, label: <Link to="/payment/mode">{translate('payments_mode')}</Link> },
    { key: 'taxes', icon: <ShopOutlined />, label: <Link to="/taxes">{translate('taxes')}</Link> },
    { key: 'settings', icon: <SettingOutlined />, label: <Link to="/settings">{translate('settings')}</Link> },
    { key: 'about', icon: <ReconciliationOutlined />, label: <Link to="/about">{translate('about')}</Link> },
  ];

  return (
    <Sider
      collapsible
      collapsed={isNavMenuClose}
      onCollapse={navMenu.collapse}
      width={256}
      theme="light"
      style={{
        background: '#f8fafc',           // ✅ CHANGED
        borderRight: '1px solid #e5e7eb', // ✅ CHANGED
      }}
    >
      {/* Brand removed intentionally */}

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        style={{
          border: 'none',
          background: 'transparent',
          paddingTop: 16,
        }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="text" onClick={() => setOpen(true)}>
        <MenuOutlined />
      </Button>

      <Drawer
        placement="left"
        width={256}
        open={open}
        onClose={() => setOpen(false)}
        bodyStyle={{ padding: 0 }}
      >
        <DesktopSidebar />
      </Drawer>
    </>
  );
}
