import { Router, Route, RootRoute } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import AppContainer from './components/AppContainer';
import OrdersContainer from './components/orders/OrdersContainer';
import AboutContainer from './components/about/AboutContainer';
import CustomersContainer from './components/customers/CustomersContainer';
import CustomerContainer from './components/customer/CustomerContainer';
import CustomerDetails from './components/customer/CustomerDetails';
import CustomerEdit from './components/customer/CustomerEdit';
import Orders from './components/orders/Orders';
import About from './components/about/About';
import Login from './components/login/Login';

const rootRoute = new RootRoute({
  component: AppContainer,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: async () => {
    return { to: '/customers' };
  },
});

const customersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/customers',
  component: () => (
    <Suspense fallback={<div>Loading customers...</div>}>
      <CustomersContainer />
    </Suspense>
  ),
});

const customerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/customers/$id',
  component: () => (
    <Suspense fallback={<div>Loading customer...</div>}>
      <CustomerContainer />
    </Suspense>
  ),
});

const customerDetailsRoute = new Route({
  getParentRoute: () => customerRoute,
  path: '/',
  component: () => (
    <Suspense fallback={<div>Loading customer details...</div>}>
      <CustomerDetails />
    </Suspense>
  ),
});

const customerEditRoute = new Route({
  getParentRoute: () => customerRoute,
  path: '/edit',
  component: () => (
    <Suspense fallback={<div>Loading customer edit...</div>}>
      <CustomerEdit />
    </Suspense>
  ),
});

const newCustomerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/customers/new/edit',
  component: () => (
    <Suspense fallback={<div>Loading new customer form...</div>}>
      <CustomerEdit />
    </Suspense>
  ),
});

const ordersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: () => (
    <Suspense fallback={<div>Loading orders...</div>}>
      <OrdersContainer />
    </Suspense>
  ),
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => (
    <Suspense fallback={<div>Loading about page...</div>}>
      <AboutContainer />
    </Suspense>
  ),
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => (
    <Suspense fallback={<div>Loading login page...</div>}>
      <Login />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  customersRoute,
  customerRoute.addChildren([
    customerDetailsRoute,
    customerEditRoute,
  ]),
  newCustomerRoute,
  ordersRoute,
  aboutRoute,
  loginRoute,
]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
