import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataService } from '../core/services/data.service';
import { ICustomer } from '../shared/interfaces';

/**
 * Customers component for displaying customer list
 */
const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<ICustomer[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState('card'); // 'card', 'grid', or 'map'
  const [filterText, setFilterText] = useState('');

  const getCustomersPage = React.useCallback(async (page: number) => {
    try {
      const response = await DataService.getCustomersPage(page, pageSize);
      setCustomers(response.results);
      setFilteredCustomers(response.results);
      setTotalRecords(response.totalRecords);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }, [pageSize]);

  useEffect(() => {
    getCustomersPage(1);
  }, [getCustomersPage]);

  const handleFilterChange = (text: string) => {
    setFilterText(text);
    
    if (text && customers) {
      const upperText = text.toUpperCase();
      const filtered = customers.filter(customer => {
        return (
          customer.firstName.toUpperCase().includes(upperText) ||
          customer.lastName.toUpperCase().includes(upperText) ||
          customer.city.toUpperCase().includes(upperText) ||
          (customer.state && customer.state.name.toUpperCase().includes(upperText))
        );
      });
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  };

  const handlePageChange = (page: number) => {
    getCustomersPage(page);
  };

  const handleDisplayModeChange = (mode: string) => {
    setDisplayMode(mode);
  };

  return (
    <div className="container">
      <h1>Customers</h1>
      
      {/* Filter */}
      <div className="filter-container">
        <input 
          type="text" 
          placeholder="Filter customers..." 
          value={filterText}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="filter-input"
        />
      </div>
      
      {/* Display mode buttons */}
      <div className="display-mode-buttons">
        <button 
          className={`btn ${displayMode === 'card' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleDisplayModeChange('card')}
        >
          Card View
        </button>
        <button 
          className={`btn ${displayMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleDisplayModeChange('grid')}
        >
          Grid View
        </button>
        <button 
          className={`btn ${displayMode === 'map' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleDisplayModeChange('map')}
        >
          Map View
        </button>
      </div>
      
      {/* Customer cards */}
      {displayMode === 'card' && (
        <div className="row">
          {filteredCustomers.map(customer => (
            <div key={customer.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-header">
                  {customer.firstName} {customer.lastName}
                </div>
                <div className="card-body">
                  <p>{customer.address}</p>
                  <p>{customer.city}, {customer.state.abbreviation}</p>
                  {customer.orderTotal && (
                    <p>Total: ${customer.orderTotal.toFixed(2)}</p>
                  )}
                  <Link to={`/customers/${customer.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Customer grid */}
      {displayMode === 'grid' && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Order Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.firstName} {customer.lastName}</td>
                <td>{customer.address}</td>
                <td>{customer.city}</td>
                <td>{customer.state.abbreviation}</td>
                <td>{customer.orderTotal ? `$${customer.orderTotal.toFixed(2)}` : ''}</td>
                <td>
                  <Link to={`/customers/${customer.id}`} className="btn btn-sm btn-primary">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {/* Map view placeholder */}
      {displayMode === 'map' && (
        <div className="map-container">
          <p>Map view will be implemented here</p>
        </div>
      )}
      
      {/* Pagination */}
      {totalRecords > pageSize && (
        <div className="pagination-container">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(totalRecords / pageSize) }, (_, i) => i + 1).map(page => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Customers;
