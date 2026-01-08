import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';

import Navigation from '@/apps/Navigation/NavigationContainer';
import HeaderContent from '@/apps/Header/HeaderContainer';
import AppRouter from '@/router/AppRouter';

import { settingsAction } from '@/redux/settings/actions';
import useResponsive from '@/hooks/useResponsive';

const { Content } = Layout;

export default function ErpCrmApp() {
  const { isMobile } = useResponsive();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }));
  }, [dispatch]);

  return (
    <Layout
      hasSider  
      style={{
        minHeight: '100vh',
        background: '#f5f7fb',
      }}
    >
      {/* Sidebar */}
      <Navigation />

      {/* Main Area */}
      <Layout
        style={{
          marginLeft: isMobile ? 0 : undefined,
          background: 'transparent',
        }}
      >
        {/* Header */}
        <HeaderContent />

        {/* Routed content */}
        <Content
          style={{
            padding: isMobile ? '20px' : '32px 40px',
            width: '100%',
          }}
        >
          {/* ⬇️ IMPORTANT: no forced white wrapper */}
          <AppRouter />
        </Content>
      </Layout>
    </Layout>
  );
}
