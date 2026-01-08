import { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import CollapseBox from '../CollapseBox';

import { useCrudContext } from '@/context/crud';

export default function SidePanel({
  config,
  topContent,
  bottomContent,
  fixHeaderPanel,
}) {
  let state = {};
  let crudContextAction = {};

  try {
    const ctx = useCrudContext();
    state = ctx.state || {};
    crudContextAction = ctx.crudContextAction || {};
  } catch (e) {
    // ❗ Not inside CrudContextProvider — safely do nothing
    return null;
  }

  const { isPanelClose, isBoxCollapsed } = state;
  const { panel, collapsedBox } = crudContextAction;

  const [opacitySider, setOpacitySider] = useState(0);
  const [paddingTopSider, setPaddingTopSider] = useState('20px');

  useEffect(() => {
    let timer;
    if (isPanelClose) {
      setOpacitySider(0);
      setPaddingTopSider('20px');
    } else {
      timer = setTimeout(() => {
        setOpacitySider(1);
        setPaddingTopSider(0);
      }, 200);
    }
    return () => clearTimeout(timer);
  }, [isPanelClose]);

  return (
    <Drawer
      title={config?.PANEL_TITLE}
      placement="right"
      onClose={() => panel?.collapse?.()}
      open={!isPanelClose}
      width={450}
    >
      <div
        className="sidePanelContent"
        style={{ opacity: opacitySider, paddingTop: paddingTopSider }}
      >
        {fixHeaderPanel}
        <CollapseBox
          buttonTitle={config?.ADD_NEW_ENTITY}
          isCollapsed={isBoxCollapsed}
          onCollapse={() => collapsedBox?.collapse?.()}
          topContent={topContent}
          bottomContent={bottomContent}
        />
      </div>
    </Drawer>
  );
}
