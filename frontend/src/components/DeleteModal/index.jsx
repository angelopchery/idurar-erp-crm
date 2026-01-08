import { useEffect, useState } from 'react';
import { Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectDeletedItem } from '@/redux/crud/selectors';
import { valueByString } from '@/utils/helpers';
import useLanguage from '@/locale/useLanguage';

import { useCrudContext } from '@/context/crud';
import { useAppContext } from '@/context/appContext';

export default function DeleteModal({ config }) {
  let crudContextAction = {};
  let state = {};
  let appContextAction = {};

  try {
    const ctx = useCrudContext();
    crudContextAction = ctx.crudContextAction || {};
    state = ctx.state || {};
    appContextAction = useAppContext().appContextAction || {};
  } catch {
    return null;
  }

  const { panel, readBox, modal } = crudContextAction;
  const { navMenu } = appContextAction;
  const { isModalOpen } = state;

  const dispatch = useDispatch();
  const translate = useLanguage();

  const {
    entity,
    deleteModalLabels,
    deleteMessage = translate('are_you_sure_you_want_to_delete'),
    modalTitle = translate('delete_confirmation'),
  } = config;

  const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);
  const [displayItem, setDisplayItem] = useState('');

  useEffect(() => {
    if (isSuccess) {
      modal.close();
      dispatch(crud.list({ entity }));
    }

    if (current && deleteModalLabels) {
      setDisplayItem(
        deleteModalLabels.map((x) => valueByString(current, x)).join(' ')
      );
    }
  }, [isSuccess, current]);

  return (
    <Modal
      open={isModalOpen}
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={() => {
        dispatch(crud.delete({ entity, id: current._id }));
        readBox.close();
        modal.close();
        panel.close();
        navMenu?.collapse?.();
      }}
      onCancel={() => !isLoading && modal.close()}
    >
      <p>
        {deleteMessage} {displayItem}
      </p>
    </Modal>
  );
}
