import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Orders from '../orders/Orders';
import { DataService } from '../core/services/data.service';

vi.mock('../core/services/data.service', () => ({
  DataService: {
    getCustomers: vi.fn()
  }
}));

describe('Orders Component', () => {
  const mockCustomers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      orders: [
        { productName: 'Product 1', itemCost: 50 },
        { productName: 'Product 2', itemCost: 75 }
      ]
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      orders: [
        { productName: 'Product 3', itemCost: 100 }
      ]
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    (DataService.getCustomers as any).mockResolvedValue(mockCustomers);
  });

  test('renders orders list', async () => {
    render(<Orders />);

    expect(screen.getByText('Loading orders...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(DataService.getCustomers).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(screen.getByText('Orders')).toBeInTheDocument();
      expect(screen.getAllByText('John Doe').length).toBe(2);
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('Product 3')).toBeInTheDocument();
      expect(screen.getAllByText('$50.00').length).toBeGreaterThan(0);
      expect(screen.getAllByText('$75.00').length).toBeGreaterThan(0);
      expect(screen.getAllByText('$100.00').length).toBeGreaterThan(0);
      expect(screen.getByText('$225.00')).toBeInTheDocument(); // Total of all orders
    });
  });

  test('renders no orders message when no orders exist', async () => {
    (DataService.getCustomers as any).mockResolvedValue([]);
    
    render(<Orders />);
    
    await waitFor(() => {
      expect(DataService.getCustomers).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(screen.getByText('No orders found')).toBeInTheDocument();
    });
  });
});
