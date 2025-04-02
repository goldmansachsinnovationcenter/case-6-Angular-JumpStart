import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DataService } from '../core/services/data.service';
import { ICustomer } from '../shared/interfaces';

/**
 * Customer component for displaying customer details
 */
const Customer: React.FC = () => {
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await DataService.getCustomer(parseInt(id, 10));
        setCustomer(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching customer:', err);
        setError('Error loading customer data');
        setLoading(false);
      }
    };
    
    fetchCustomer();
  }, [id]);
  
  const handleDeleteCustomer = async () => {
    if (!customer) return;
    
    if (window.confirm(`Are you sure you want to delete ${customer.firstName} ${customer.lastName}?`)) {
      try {
        const success = await DataService.deleteCustomer(customer.id);
        if (success) {
          navigate('/customers');
        } else {
          setError('Error deleting customer');
        }
      } catch (err) {
        console.error('Error deleting customer:', err);
        setError('Error deleting customer');
      }
    }
  };
  
  if (loading) {
    return <div className="loading">Loading customer data...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (!customer) {
    return <div className="not-found">Customer not found</div>;
  }
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>
            {customer.firstName} {customer.lastName}
          </h1>
          
          {/* Customer details */}
          <div className="card">
            <div className="card-header">
              Customer Information
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name:</label>
                    <div>{customer.firstName}</div>
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <div>{customer.lastName}</div>
                  </div>
                  <div className="form-group">
                    <label>Gender:</label>
                    <div>{customer.gender}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Address:</label>
                    <div>{customer.address}</div>
                  </div>
                  <div className="form-group">
                    <label>City:</label>
                    <div>{customer.city}</div>
                  </div>
                  <div className="form-group">
                    <label>State:</label>
                    <div>{customer.state.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Customer orders */}
          <div className="card mt-4">
            <div className="card-header">
              Orders
            </div>
            <div className="card-body">
              {customer.orders && customer.orders.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.orders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.productName}</td>
                        <td>${order.itemCost.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td><strong>Total</strong></td>
                      <td><strong>${customer.orderTotal?.toFixed(2)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <div>No orders found</div>
              )}
            </div>
          </div>
          
          {/* Map placeholder */}
          <div className="card mt-4">
            <div className="card-header">
              Map
            </div>
            <div className="card-body">
              <div className="map-container">
                <p>Map will be implemented here</p>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="button-group mt-4">
            <Link to={`/customers/${customer.id}/edit`} className="btn btn-primary">
              Edit
            </Link>
            <button onClick={handleDeleteCustomer} className="btn btn-danger ml-2">
              Delete
            </button>
            <Link to="/customers" className="btn btn-secondary ml-2">
              Back to Customers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
