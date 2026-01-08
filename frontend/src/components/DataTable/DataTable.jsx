import { useCallback, useEffect } from 'react';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  RedoOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Dropdown, Table, Button, Input } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { dataForTable } from '@/utils/dataStructure';
import { useMoney, useDate } from '@/settings';
import { generate as uniqueId } from 'shortid';

import { useCrudContext } from '@/context/crud';

function AddNewItem({ config }) {
  let crudContextAction = {};

  try {
    const ctx = useCrudContext();
    crudContextAction = ctx.crudContextAction || {};
  } catch {
    return null;
  }

  const { collapsedBox, panel } = crudContextAction;
  const { ADD_NEW_ENTITY } = config;

  return (
    <Button
      type="primary"
      onClick={() => {
        panel?.open?.();
        collapsedBox?.close?.();
      }}
    >
      {ADD_NEW_ENTITY}
    </Button>
  );
}

export default function DataTable({ config, extra = [] }) {
  let crudContextAction = {};

  try {
    const ctx = useCrudContext();
    crudContextAction = ctx.crudContextAction || {};
  } catch {
    return null; // ❗ critical guard
  }

  const { panel, collapsedBox, modal, readBox, editBox, advancedBox } =
    crudContextAction;

  const dispatch = useDispatch();
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const { dateFormat } = useDate();

  const { entity, dataTableColumns, DATATABLE_TITLE, fields, searchConfig } =
    config;

  const items = [
    { label: translate('Show'), key: 'read', icon: <EyeOutlined /> },
    { label: translate('Edit'), key: 'edit', icon: <EditOutlined /> },
    ...extra,
    { type: 'divider' },
    { label: translate('Delete'), key: 'delete', icon: <DeleteOutlined /> },
  ];

  const handleRead = (record) => {
    dispatch(crud.currentItem({ data: record }));
    panel.open();
    collapsedBox.open();
    readBox.open();
  };

  const handleEdit = (record) => {
    dispatch(crud.currentItem({ data: record }));
    dispatch(crud.currentAction({ actionType: 'update', data: record }));
    editBox.open();
    panel.open();
    collapsedBox.open();
  };

  const handleDelete = (record) => {
    dispatch(crud.currentAction({ actionType: 'delete', data: record }));
    modal.open();
  };

  const dispatchColumns = fields
    ? dataForTable({ fields, translate, moneyFormatter, dateFormat })
    : dataTableColumns;

  const columns = [
    ...dispatchColumns,
    {
      title: '',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          trigger={['click']}
          menu={{
            items,
            onClick: ({ key }) => {
              if (key === 'read') handleRead(record);
              if (key === 'edit') handleEdit(record);
              if (key === 'delete') handleDelete(record);
            },
          }}
        >
          <EllipsisOutlined style={{ cursor: 'pointer', fontSize: 22 }} />
        </Dropdown>
      ),
    },
  ];

  const { result: listResult, isLoading } = useSelector(selectListItems);
  const { pagination, items: dataSource } = listResult || {};

  const loadTable = useCallback(
    (pagination) => {
      dispatch(
        crud.list({
          entity,
          options: {
            page: pagination?.current || 1,
            items: pagination?.pageSize || 10,
          },
        })
      );
    },
    [dispatch, entity]
  );

  useEffect(() => {
    dispatch(crud.list({ entity }));
  }, [dispatch, entity]);

  return (
    <>
      <PageHeader
        backIcon={<ArrowLeftOutlined />}
        onBack={() => window.history.back()}
        title={DATATABLE_TITLE}
        extra={[
          <Input
            key="search"
            allowClear
            placeholder={translate('search')}
            onChange={(e) =>
              dispatch(
                crud.list({
                  entity,
                  options: {
                    q: e.target.value,
                    fields: searchConfig?.searchFields || '',
                  },
                })
              )
            }
          />,
          <Button key="refresh" icon={<RedoOutlined />} onClick={loadTable}>
            {translate('Refresh')}
          </Button>,
          <AddNewItem key={uniqueId()} config={config} />,
        ]}
      />

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        loading={isLoading}
        onChange={loadTable}
        scroll={{ x: true }}
      />
    </>
  );
}
