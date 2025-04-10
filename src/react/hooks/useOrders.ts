import { useQuery } from '@tanstack/react-query';
import { IOrder } from '../../app/shared/interfaces';

export const useOrders = (customerId?: number | null) => {
  return useQuery({
    queryKey: ['orders', customerId],
    queryFn: async () => {
      const url = customerId ? `/api/orders/${customerId}` : '/api/orders';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<IOrder[]>;
    },
    enabled: customerId !== undefined, // Only run the query if customerId is provided or explicitly null
  });
};

export const useOrder = (orderId: number | null) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!orderId) return null;
      
      const response = await fetch(`/api/orders/order/${orderId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<IOrder>;
    },
    enabled: !!orderId, // Only run the query if we have an orderId
  });
};

export const useCustomerOrders = (customerId: number | string | null) => {
  return useQuery({
    queryKey: ['customerOrders', customerId],
    queryFn: async () => {
      if (!customerId) return [];
      
      const response = await fetch(`/api/orders/${customerId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<IOrder[]>;
    },
    enabled: !!customerId, // Only run the query if we have a customerId
  });
};
