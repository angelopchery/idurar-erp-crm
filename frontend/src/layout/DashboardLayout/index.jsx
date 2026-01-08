import React from 'react';

export default function DashboardLayout({ children }) {
  return (
    <div
      style={{
        marginLeft: 140,
        padding: '40px 56px',
        width: 'calc(100vw - 140px)',
        minHeight: '100vh',

        /* ✅ very visible difference */
        background: 'linear-gradient(180deg, #eef2ff 0%, #f1f5f9 60%, #f8fafc 100%)',
      }}
    >
      {children}
    </div>
  );
}
