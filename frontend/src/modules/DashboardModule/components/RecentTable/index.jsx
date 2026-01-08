import { Dropdown, Table } from 'antd';
import {
  EllipsisOutlined,
  EyeOutlined,
  EditOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';

import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import { useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import useLanguage from '@/locale/useLanguage';
import { useNavigate } from 'react-router-dom';
import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';

export default function RecentTable(props) {
  const translate = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { entity, dataTableColumns } = props;

  /** ✅ SAFETY: ensure columns is always an array */
  const safeColumns = Array.isArray(dataTableColumns)
    ? dataTableColumns
    : [];

  const items = [
    {
      label: translate('Show'),
      key: 'read',
      icon: <EyeOutlined />,
    },
    {
      label: translate('Edit'),
      key: 'edit',
      icon: <EditOutlined />,
    },
    {
      label: translate('Download'),
      key: 'download',
      icon: <FilePdfOutlined />,
    },
  ];

  const handleRead = (record) => {
    dispatch(erp.currentItem({ data: record }));
    navigate(`/${entity}/read/${record._id}`);
  };

  const handleEdit = (record) => {
    dispatch(erp.currentAction({ actionType: 'update', data: record }));
    navigate(`/${entity}/update/${record._id}`);
  };

  const handleDownload = (record) => {
    window.open(
      `${DOWNLOAD_BASE_URL}${entity}/${entity}-${record._id}.pdf`,
      '_blank'
    );
  };

  /** ✅ Always append action column safely */
  const columns = [
    ...safeColumns,
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              if (key === 'read') handleRead(record);
              if (key === 'edit') handleEdit(record);
              if (key === 'download') handleDownload(record);
            },
          }}
          trigger={['click']}
        >
          <EllipsisOutlined
            style={{ cursor: 'pointer', fontSize: 20 }}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      ),
    },
  ];

  const asyncList = () => request.list({ entity });

  const { result, isLoading, isSuccess } = useFetch(asyncList);

  const dataSource =
    isSuccess && Array.isArray(result)
      ? result.slice(0, 5)
      : [];

  return (
    <Table
      columns={columns}
      rowKey={(item) => item._id}
      dataSource={dataSource}
      pagination={false}
      loading={isLoading}
      scroll={{ x: true }}
    />
  );
}
