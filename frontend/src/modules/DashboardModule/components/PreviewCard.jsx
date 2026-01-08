import { Spin, Progress } from 'antd';

const statusColorMap = {
  Draft: '#bfbfbf',
  Pending: '#faad14',
  Overdue: '#ff4d4f',
  Paid: '#52c41a',
  Sent: '#1890ff',
  Accepted: '#52c41a',
  Declined: '#ff4d4f',
};

export default function PreviewCard({
  title,
  statistics = [],
  isLoading = false,
}) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 18,
        padding: 20,
        boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
        minHeight: 260,
      }}
    >
      <h4 style={{ marginBottom: 16 }}>{title}</h4>

      {isLoading ? (
        <Spin />
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {statistics.map((item, index) => {
            const color = statusColorMap[item.tag] || '#1677ff';

            return (
              <div key={index}>
                {/* Label Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                    fontSize: 13,
                  }}
                >
                  <span>{item.tag}</span>
                  <span style={{ fontWeight: 500 }}>{item.value}%</span>
                </div>

                {/* Progress */}
                <Progress
                  percent={item.value}
                  showInfo={false}
                  strokeColor={color}
                  trailColor="#f0f0f0"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
