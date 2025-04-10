import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ICustomer, IPagedResults } from '../../app/shared/interfaces';

export const useCustomers = (page = 1, pageSize = 10, filter = '') => {
  return useQuery({
    queryKey: ['customers', page, pageSize, filter],
    queryFn: async () => {
      const url = filter 
        ? `/api/customers/page/${page}/${pageSize}/${filter}` 
        : `/api/customers/page/${page}/${pageSize}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<IPagedResults<ICustomer[]>>;
    },
  });
};

export const useCustomer = (id: number | string | null) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      if (!id) return null;
      
      const response = await fetch(`/api/customers/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<ICustomer>;
    },
    enabled: !!id, // Only run the query if we have an ID
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (customer: Omit<ICustomer, 'id'>) => {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return response.json() as Promise<ICustomer>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (customer: ICustomer) => {
      const response = await fetch(`/api/customers/${customer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return response.json() as Promise<ICustomer>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['customer', data.id], data);
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return id;
    },
    onSuccess: (id) => {
      queryClient.removeQueries({ queryKey: ['customer', id] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};
