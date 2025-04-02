import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Customers = lazy(() => import('../app/customers/Customers'));
const CustomerDetails = lazy(() => import('../app/customer/Customer'));
const Orders = lazy(() => import('../app/orders/Orders'));
const About = lazy(() => import('../app/about/About'));
const Login = lazy(() => import('../app/login/Login'));

const Loading = () => <div className="loading">Loading...</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/customers" replace />
  },
  {
    path: '/customers',
    element: (
      <Suspense fallback={<Loading />}>
        <Customers />
      </Suspense>
    )
  },
  {
    path: '/customers/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <CustomerDetails />
      </Suspense>
    )
  },
  {
    path: '/orders',
    element: (
      <Suspense fallback={<Loading />}>
        <Orders />
      </Suspense>
    )
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>
    )
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    )
  },
  {
    path: '*',
    element: <Navigate to="/customers" replace />
  }
]);
