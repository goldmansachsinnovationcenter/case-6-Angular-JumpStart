import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Customer from '../customer/Customer';
import { DataService } from '../core/services/data.service';

vi.mock('../core/services/data.service', () => ({
  DataService: {
    getCustomer: vi.fn()
  }
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn()
  };
});

describe('Customer Component', () => {
  const mockCustomer = {
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
      { productName: 'Product 1', itemCost: 50 },
      { productName: 'Product 2', itemCost: 75 }
    ],
    orderTotal: 125
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    (DataService.getCustomer as any).mockResolvedValue(mockCustomer);
  });

  test('renders customer details', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Customer />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText('Loading customer data...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(DataService.getCustomer).toHaveBeenCalledWith(1);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /john doe/i })).toBeInTheDocument();
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getAllByText('New York').length).toBe(2);
      expect(screen.getByText('male')).toBeInTheDocument();
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getAllByText('$50.00').length).toBeGreaterThan(0);
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getAllByText('$75.00').length).toBeGreaterThan(0);
      expect(screen.getByText('$125.00')).toBeInTheDocument();
    });
  });
});
