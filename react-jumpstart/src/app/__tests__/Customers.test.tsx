import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Customers from '../customers/Customers';
import { DataService } from '../core/services/data.service';

vi.mock('../core/services/data.service', () => ({
  DataService: {
    getCustomersPage: vi.fn()
  }
}));

describe('Customers Component', () => {
  const mockCustomers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      address: '123 Main St',
      city: 'New York',
      state: {
        id: 1,
        name: 'New York',
        abbreviation: 'NY'
      },
      orders: [
        { productName: 'Product 1', itemCost: 50 }
      ],
      orderTotal: 50
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      gender: 'female',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: {
        id: 2,
        name: 'California',
        abbreviation: 'CA'
      },
      orders: [
        { productName: 'Product 2', itemCost: 75 }
      ],
      orderTotal: 75
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    (DataService.getCustomersPage as any).mockResolvedValue({
      results: mockCustomers,
      totalRecords: 2
    });
  });

  test('renders customer list in card view', async () => {
    render(
      <BrowserRouter>
        <Customers />
      </BrowserRouter>
    );

    expect(screen.getByText('Customers')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(DataService.getCustomersPage).toHaveBeenCalledWith(1, 10);
    });
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getByText('456 Oak Ave')).toBeInTheDocument();
      expect(screen.getByText('New York, NY')).toBeInTheDocument();
      expect(screen.getByText('Los Angeles, CA')).toBeInTheDocument();
      expect(screen.getByText('Total: $50.00')).toBeInTheDocument();
      expect(screen.getByText('Total: $75.00')).toBeInTheDocument();
    });
  });
});
