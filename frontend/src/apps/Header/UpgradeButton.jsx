import { Button, Badge } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

export default function UpgradeButton() {
  const translate = useLanguage();

  return (
    <Badge count={1} size="small">
      <Button
        type="primary"
        icon={<RocketOutlined />}
        style={{
          height: 40,
          padding: '0 18px',
          background: 'linear-gradient(135deg, #1db954, #16923e)',
          border: 'none',
          fontWeight: 600,
          boxShadow: '0 6px 16px rgba(22, 146, 62, 0.35)',
        }}
        onClick={() => window.open('https://entreprise.idurarapp.com')}
      >
        {translate('Try Enterprise')}
      </Button>
    </Badge>
  );
}
