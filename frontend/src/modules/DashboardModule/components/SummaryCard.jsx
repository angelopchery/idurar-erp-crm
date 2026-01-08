import { Spin, Button } from 'antd';
import {
  FileTextOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useMoney } from '@/settings';
import { useSelector } from 'react-redux';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  invoice: <FileTextOutlined />,
  quote: <FileDoneOutlined />,
  paid: <CheckCircleOutlined />,
  unpaid: <CloseCircleOutlined />,
};

const gradientMap = {
  invoice: 'linear-gradient(135deg, #2563eb, #60a5fa)',
  quote: 'linear-gradient(135deg, #7c3aed, #c4b5fd)',
  paid: 'linear-gradient(135deg, #16a34a, #86efac)',
  unpaid: 'linear-gradient(135deg, #dc2626, #fca5a5)',
};

/** Optional actions for empty states */
const actionMap = {
  invoice: {
    label: 'Create Invoice',
    path: '/invoice/create',
  },
  quote: {
    label: 'Create Quote',
    path: '/quote/create',
  },
};

export default function SummaryCard({
  title,
  data,
  isLoading,
  type,
  viewMode = 'month',
}) {
  const navigate = useNavigate();
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);

  const subtitle = viewMode === 'all' ? 'All Time' : 'This Month';

  const isNumber = typeof data === 'number';
  const hasCurrency = money_format_settings?.default_currency_code;

  const isZero = isNumber && data === 0;
  const canFormat = isNumber && hasCurrency && data > 0;

  return (
    <div
      style={{
        padding: 24,
        borderRadius: 18,
        color: '#fff',
        background: gradientMap[type],
        boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
        minHeight: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 22 }}>{iconMap[type]}</div>
        <div style={{ fontSize: 14, opacity: 0.9 }}>{title}</div>
      </div>

      {/* Main value */}
      <div style={{ marginTop: 16 }}>
        {isLoading ? (
          <Spin />
        ) : canFormat ? (
          <div style={{ fontSize: 28, fontWeight: 600 }}>
            {moneyFormatter({
              amount: data,
              currency_code: money_format_settings.default_currency_code,
            })}
          </div>
        ) : isZero ? (
          <div style={{ fontSize: 18, opacity: 0.95 }}>
            No {title.toLowerCase()} yet
          </div>
        ) : (
          <div style={{ fontSize: 22 }}>—</div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
          opacity: 0.85,
        }}
      >
        <span>{subtitle}</span>

        {/* Action button only when meaningful */}
        {isZero && actionMap[type] && (
          <Button
            size="small"
            type="primary"
            ghost
            onClick={() => navigate(actionMap[type].path)}
          >
            {actionMap[type].label}
          </Button>
        )}
      </div>
    </div>
  );
}
