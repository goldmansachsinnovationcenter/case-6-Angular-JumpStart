import axios from 'axios';
import { UtilitiesService } from './utilities.service';
import { IApiResponse, ICustomer, IPagedResults, IState } from '../../shared/interfaces';

/**
 * Data service for handling API requests
 */
export const DataService = {
  baseUrl: UtilitiesService.getApiUrl(),
  customersBaseUrl: `${UtilitiesService.getApiUrl()}/api/customers`,
  ordersBaseUrl: `${UtilitiesService.getApiUrl()}/api/orders`,

  /**
   * Get customers with pagination
   */
  getCustomersPage: async (page: number, pageSize: number): Promise<IPagedResults<ICustomer[]>> => {
    try {
      const response = await axios.get<ICustomer[]>(
        `${DataService.customersBaseUrl}/page/${page}/${pageSize}`,
        { 
          headers: { 'Accept': 'application/json' }
        }
      );
      
      const totalRecords = Number(response.headers['x-inlinecount']);
      const customers = response.data;
      DataService.calculateCustomersOrderTotal(customers);
      
      return {
        results: customers,
        totalRecords
      };
    } catch (error) {
      console.error('Error in getCustomersPage:', error);
      throw error;
    }
  },

  /**
   * Get all customers
   */
  getCustomers: async (): Promise<ICustomer[]> => {
    try {
      const response = await axios.get<ICustomer[]>(DataService.customersBaseUrl);
      const customers = response.data;
      DataService.calculateCustomersOrderTotal(customers);
      return customers;
    } catch (error) {
      console.error('Error in getCustomers:', error);
      throw error;
    }
  },

  /**
   * Get a customer by ID
   */
  getCustomer: async (id: number): Promise<ICustomer> => {
    try {
      const response = await axios.get<ICustomer>(`${DataService.customersBaseUrl}/${id}`);
      const customer = response.data;
      DataService.calculateCustomersOrderTotal([customer]);
      return customer;
    } catch (error) {
      console.error(`Error in getCustomer(${id}):`, error);
      throw error;
    }
  },

  /**
   * Insert a new customer
   */
  insertCustomer: async (customer: ICustomer): Promise<ICustomer> => {
    try {
      const response = await axios.post<ICustomer>(DataService.customersBaseUrl, customer);
      return response.data;
    } catch (error) {
      console.error('Error in insertCustomer:', error);
      throw error;
    }
  },

  /**
   * Update an existing customer
   */
  updateCustomer: async (customer: ICustomer): Promise<boolean> => {
    try {
      const response = await axios.put<IApiResponse>(`${DataService.customersBaseUrl}/${customer.id}`, customer);
      return response.data.status;
    } catch (error) {
      console.error(`Error in updateCustomer(${customer.id}):`, error);
      throw error;
    }
  },

  /**
   * Delete a customer
   */
  deleteCustomer: async (id: number): Promise<boolean> => {
    try {
      const response = await axios.delete<IApiResponse>(`${DataService.customersBaseUrl}/${id}`);
      return response.data.status;
    } catch (error) {
      console.error(`Error in deleteCustomer(${id}):`, error);
      throw error;
    }
  },

  /**
   * Get all states
   */
  getStates: async (): Promise<IState[]> => {
    try {
      const response = await axios.get<IState[]>(`${DataService.baseUrl}/api/states`);
      return response.data;
    } catch (error) {
      console.error('Error in getStates:', error);
      throw error;
    }
  },

  /**
   * Calculate the order total for each customer
   */
  calculateCustomersOrderTotal: (customers: ICustomer[]): void => {
    for (const customer of customers) {
      if (customer && customer.orders) {
        let total = 0;
        for (const order of customer.orders) {
          total += order.itemCost;
        }
        customer.orderTotal = total;
      }
    }
  }
};
