import { useEffect, useState } from 'react';
import { Typography, Divider, Segmented } from 'antd';
import { useSelector } from 'react-redux';

import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';

import useFetch from '@/hooks/useFetch';
import useOnFetch from '@/hooks/useOnFetch';

import { selectMoneyFormat } from '@/redux/settings/selectors';

import SummaryCard from './components/SummaryCard';
import PreviewCard from './components/PreviewCard';
import CustomerPreviewCard from './components/CustomerPreviewCard';
import RecentTable from './components/RecentTable';

const { Title, Text } = Typography;

export default function DashboardModule() {
  const translate = useLanguage();
  const money_format_settings = useSelector(selectMoneyFormat);

  // ✅ Safe local UI-only state
  const [viewMode, setViewMode] = useState('month');

  const getStatsData = async ({ entity, currency }) =>
    request.summary({ entity, options: { currency } });

  const {
    result: invoiceResult,
    isLoading: invoiceLoading,
    onFetch: fetchInvoices,
  } = useOnFetch();

  const {
    result: quoteResult,
    isLoading: quoteLoading,
    onFetch: fetchQuotes,
  } = useOnFetch();

  const {
    result: paymentResult,
    isLoading: paymentLoading,
    onFetch: fetchPayments,
  } = useOnFetch();

  const {
    result: clientResult,
    isLoading: clientLoading,
  } = useFetch(() => request.summary({ entity: 'client' }));

  useEffect(() => {
    const currency = money_format_settings?.default_currency_code;
    if (!currency) return;

    fetchInvoices(getStatsData({ entity: 'invoice', currency }));
    fetchQuotes(getStatsData({ entity: 'quote', currency }));
    fetchPayments(getStatsData({ entity: 'payment', currency }));
  }, [money_format_settings?.default_currency_code]);

  // ✅ IMPORTANT: never return null → avoids white screen
  if (!money_format_settings) {
    return <div style={{ padding: 40 }}>Loading dashboard…</div>;
  }

  const mapPerformance = (performance) =>
    Array.isArray(performance)
      ? performance.map((p) => ({
          tag: p?.status,
          value: Number(p?.percentage) || 0,
        }))
      : [];

  return (
    <>
      {/* ===== HEADER ===== */}
      <div
        style={{
          marginBottom: 48,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <Title level={2} style={{ marginBottom: 4 }}>
            {translate('Dashboard')}
          </Title>
          <Text type="secondary">
            {translate('Overview of your business performance')}
          </Text>
        </div>

        {/* Option A toggle (frontend only) */}
        <Segmented
          value={viewMode}
          onChange={setViewMode}
          options={[
            { label: translate('This Month'), value: 'month' },
            { label: translate('All Time'), value: 'all' },
          ]}
        />
      </div>

      {/* ===== KPI STRIP ===== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          marginBottom: 56,
        }}
      >
        <SummaryCard
          title="Invoices"
          type="invoice"
          data={invoiceResult?.total}
          isLoading={invoiceLoading}
          viewMode={viewMode}
        />
        <SummaryCard
          title="Quotes"
          type="quote"
          data={quoteResult?.total}
          isLoading={quoteLoading}
          viewMode={viewMode}
        />
        <SummaryCard
          title="Paid"
          type="paid"
          data={paymentResult?.total}
          isLoading={paymentLoading}
          viewMode={viewMode}
        />
        <SummaryCard
          title="Unpaid"
          type="unpaid"
          data={invoiceResult?.total_undue}
          isLoading={invoiceLoading}
          viewMode={viewMode}
        />
      </div>

      {/* ===== ANALYTICS ===== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2.2fr 1fr',
          gap: 32,
          marginBottom: 56,
        }}
      >
        <div>
          <Title level={4} style={{ marginBottom: 16 }}>
            Performance Overview
          </Title>

          <div
            className="whiteBox"
            style={{
              padding: 24,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 24,
              }}
            >
              <PreviewCard
                title="Invoices"
                entity="invoice"
                isLoading={invoiceLoading}
                statistics={mapPerformance(invoiceResult?.performance)}
              />
              <PreviewCard
                title="Quotes"
                entity="quote"
                isLoading={quoteLoading}
                statistics={mapPerformance(quoteResult?.performance)}
              />
            </div>
          </div>
        </div>

        <div>
          <Title level={4} style={{ marginBottom: 16 }}>
            Customers
          </Title>
          <CustomerPreviewCard
            isLoading={clientLoading}
            activeCustomer={clientResult?.active}
            newCustomer={clientResult?.new}
          />
        </div>
      </div>

      {/* ===== RECENT ===== */}
      <Divider />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
        }}
      >
        <div>
          <Title level={4}>Recent Invoices</Title>
          <RecentTable entity="invoice" />
        </div>
        <div>
          <Title level={4}>Recent Quotes</Title>
          <RecentTable entity="quote" />
        </div>
      </div>
    </>
  );
}
