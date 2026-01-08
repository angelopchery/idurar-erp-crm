import { Spin, Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function CustomerPreviewCard({
  isLoading = false,
  activeCustomer = 0,
  newCustomer = 0,
}) {
  return (
    <div
      style={{
        background: '#f6ffed',
        borderRadius: 18,
        padding: 24,
        boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <UserOutlined style={{ fontSize: 20, color: '#52c41a' }} />
        <h3 style={{ margin: 0 }}>Customers</h3>
      </div>

      {isLoading ? (
        <Spin style={{ margin: '40px auto' }} />
      ) : (
        <>
          {/* New Customers KPI */}
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <div style={{ fontSize: 36, fontWeight: 600 }}>
              {newCustomer}%
            </div>
            <div style={{ color: '#8c8c8c', fontSize: 13 }}>
              New Customers This Month
            </div>
          </div>

          {/* Progress */}
          <Progress
            percent={newCustomer}
            strokeColor="#52c41a"
            showInfo={false}
            style={{ marginTop: 16 }}
          />

          {/* Active Customers */}
          <div
            style={{
              marginTop: 32,
              paddingTop: 16,
              borderTop: '1px solid #e8f5e9',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 13, color: '#8c8c8c' }}>
              Active Customers
            </div>
            <div style={{ fontSize: 22, fontWeight: 500 }}>
              {activeCustomer}%
            </div>
          </div>
        </>
      )}
    </div>
  );
}
