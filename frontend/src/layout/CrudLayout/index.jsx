import { useEffect, useState } from 'react';
import DefaultLayout from '../DefaultLayout';

import SidePanel from '@/components/SidePanel';
import { Layout } from 'antd';
import { useCrudContext } from '@/context/crud';

const { Content } = Layout;

/**
 * Safe ContentBox
 * - Does NOT crash if CrudContextProvider is missing
 * - Properly fits viewport (no zoom / no overflow)
 */
const ContentBox = ({ children }) => {
  let isPanelClose = true;

  // ✅ Safe access to CrudContext
  try {
    const { state } = useCrudContext();
    isPanelClose = state?.isPanelClose ?? true;
  } catch (e) {
    // Route not wrapped in CrudContextProvider (Dashboard, About, etc.)
    // This is expected and safe
  }

  return (
    <Content
      className="whiteBox shadow"
      style={{
        margin: 0,
        padding: '24px',
        width: '100%',
        minHeight: 'calc(100vh - 64px)', // header height
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {children}
    </Content>
  );
};

export default function CrudLayout({
  children,
  config,
  sidePanelTopContent,
  sidePanelBottomContent,
  fixHeaderPanel,
}) {
  return (
    <DefaultLayout>
      {/* ✅ Render SidePanel only when config exists */}
      {config && (
        <SidePanel
          config={config}
          topContent={sidePanelTopContent}
          bottomContent={sidePanelBottomContent}
          fixHeaderPanel={fixHeaderPanel}
        />
      )}

      <ContentBox>{children}</ContentBox>
    </DefaultLayout>
  );
}
