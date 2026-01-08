import { ErpContextProvider } from '@/context/erp';
import { Layout } from 'antd';

const { Content } = Layout;

export default function ErpLayout({ children }) {
  return (
    <ErpContextProvider>
      <Content
        /* ❌ remove whiteBox */
        className="layoutPadding"
        style={{
          margin: '30px auto',
          width: '100%',
          maxWidth: '1200px',
          minHeight: '600px',

          /* ✅ transparent so DashboardLayout gradient shows */
          background: 'transparent',
          boxShadow: 'none',
        }}
      >
        {children}
      </Content>
    </ErpContextProvider>
  );
}
