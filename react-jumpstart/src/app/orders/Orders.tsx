import React, { useState, useEffect } from 'react';
import { DataService } from '../core/services/data.service';
import { IOrder } from '../shared/interfaces';

/**
 * Orders component for displaying all customer orders
 */
const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Array<IOrder & { customerName: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const data = await DataService.getCustomers();
        
        const allOrders: Array<IOrder & { customerName: string }> = [];
        data.forEach(customer => {
          if (customer.orders && customer.orders.length > 0) {
            customer.orders.forEach(order => {
              allOrders.push({
                ...order,
                customerName: `${customer.firstName} ${customer.lastName}`
              });
            });
          }
        });
        
        setOrders(allOrders);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Error loading customer data');
        setLoading(false);
      }
    };
    
    fetchCustomers();
  }, []);
  
  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  return (
    <div className="container">
      <h1>Orders</h1>
      
      {orders.length === 0 ? (
        <div className="alert alert-info">No orders found</div>
      ) : (
        <div className="card">
          <div className="card-header">
            All Orders
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.customerName}</td>
                    <td>{order.productName}</td>
                    <td>${order.itemCost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}><strong>Total</strong></td>
                  <td>
                    <strong>
                      ${orders.reduce((sum, order) => sum + order.itemCost, 0).toFixed(2)}
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
