import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import DefaultLayout from '@/layout/DefaultLayout';
import ErpLayout from '@/layout/ErpLayout';
import CrudLayout from '@/layout/CrudLayout';

const Logout = lazy(() => import('@/pages/Logout.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Customer = lazy(() => import('@/pages/Customer'));
const Invoice = lazy(() => import('@/pages/Invoice'));
const InvoiceCreate = lazy(() => import('@/pages/Invoice/InvoiceCreate'));
const InvoiceRead = lazy(() => import('@/pages/Invoice/InvoiceRead'));
const InvoiceUpdate = lazy(() => import('@/pages/Invoice/InvoiceUpdate'));
const InvoiceRecordPayment = lazy(() => import('@/pages/Invoice/InvoiceRecordPayment'));

const Quote = lazy(() => import('@/pages/Quote'));
const QuoteCreate = lazy(() => import('@/pages/Quote/QuoteCreate'));
const QuoteRead = lazy(() => import('@/pages/Quote/QuoteRead'));
const QuoteUpdate = lazy(() => import('@/pages/Quote/QuoteUpdate'));

const Payment = lazy(() => import('@/pages/Payment'));
const PaymentRead = lazy(() => import('@/pages/Payment/PaymentRead'));
const PaymentUpdate = lazy(() => import('@/pages/Payment/PaymentUpdate'));

const Settings = lazy(() => import('@/pages/Settings/Settings'));
const PaymentMode = lazy(() => import('@/pages/PaymentMode'));
const Taxes = lazy(() => import('@/pages/Taxes'));
const Profile = lazy(() => import('@/pages/Profile'));
const About = lazy(() => import('@/pages/About'));

const withErp = (Page) => (
  <DefaultLayout>
    <ErpLayout>{Page}</ErpLayout>
  </DefaultLayout>
);

const withCrud = (Page) => (
  <DefaultLayout>
    <CrudLayout>{Page}</CrudLayout>
  </DefaultLayout>
);

const routes = {
  default: [
    { path: '/login', element: <Navigate to="/" /> },
    { path: '/logout', element: <Logout /> },

    { path: '/', element: withErp(<Dashboard />) },
    { path: '/about', element: withErp(<About />) },
    { path: '/customer', element: withErp(<Customer />) },
    { path: '/settings', element: withErp(<Settings />) },
    { path: '/settings/edit/:settingsKey', element: withErp(<Settings />) },
    { path: '/profile', element: withErp(<Profile />) },
    { path: '/payment/mode', element: withErp(<PaymentMode />) },
    { path: '/taxes', element: withErp(<Taxes />) },

    { path: '/invoice', element: withCrud(<Invoice />) },
    { path: '/invoice/create', element: withCrud(<InvoiceCreate />) },
    { path: '/invoice/read/:id', element: withCrud(<InvoiceRead />) },
    { path: '/invoice/update/:id', element: withCrud(<InvoiceUpdate />) },
    { path: '/invoice/pay/:id', element: withCrud(<InvoiceRecordPayment />) },

    { path: '/quote', element: withCrud(<Quote />) },
    { path: '/quote/create', element: withCrud(<QuoteCreate />) },
    { path: '/quote/read/:id', element: withCrud(<QuoteRead />) },
    { path: '/quote/update/:id', element: withCrud(<QuoteUpdate />) },

    { path: '/payment', element: withCrud(<Payment />) },
    { path: '/payment/read/:id', element: withCrud(<PaymentRead />) },
    { path: '/payment/update/:id', element: withCrud(<PaymentUpdate />) },

    { path: '*', element: <NotFound /> },
  ],
};

export default routes;
