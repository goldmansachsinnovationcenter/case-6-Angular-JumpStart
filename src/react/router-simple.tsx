import React from 'react';
import { Router, Route, RootRoute } from '@tanstack/react-router';
import AppContainer from './components/AppContainer';
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
  component: () => <CustomersContainer />
});

const customersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/customers',
  component: () => <CustomersContainer />
});

const customerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/customers/$id',
  component: () => <CustomerContainer />
});

const customerDetailsRoute = new Route({
  getParentRoute: () => customerRoute,
  path: '/',
  component: () => <CustomerDetails />
});

const customerEditRoute = new Route({
  getParentRoute: () => customerRoute,
  path: '/edit',
  component: () => <CustomerEdit />
});

const newCustomerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/customers/new/edit',
  component: () => <CustomerEdit />
});

const ordersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: () => <Orders />
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => <About />
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => <Login />
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
