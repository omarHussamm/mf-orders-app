import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockOrders } from '../data/mockOrders.js'
import type { Order } from '../types/index.js'

export const OrderList = () => {
  const [orders] = useState<Order[]>(mockOrders)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const statusOptions = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { value: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { value: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { value: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { value: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length },
  ]

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending': return 'badge-warning'
      case 'processing': return 'badge-primary'
      case 'shipped': return 'badge-secondary'
      case 'delivered': return 'badge-success'
      case 'cancelled': return 'badge-danger'
      default: return 'badge-outline'
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Orders</h1>
        <Link to="/create" className="btn">
          ➕ Create New Order
        </Link>
      </div>

      <div className="card">
        <input
          type="text"
          placeholder="Search orders by number or customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            width: '100%', 
            marginBottom: '20px',
            padding: '12px',
            fontSize: '16px'
          }}
        />

        <div className="status-filters">
          {statusOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`status-filter ${statusFilter === option.value ? 'active' : ''}`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>
                  <Link 
                    to={`/detail/${order.id}`}
                    style={{ fontWeight: '600', color: '#007bff' }}
                  >
                    {order.orderNumber}
                  </Link>
                </td>
                <td>
                  <div>
                    <div style={{ fontWeight: '500' }}>{order.customerName}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      ID: {order.customerId}
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </td>
                <td style={{ fontWeight: '600' }}>
                  ${order.total.toFixed(2)}
                </td>
                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <Link 
                      to={`/detail/${order.id}`}
                      className="btn btn-outline"
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                    >
                      View
                    </Link>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <button 
                        className="btn btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '12px' }}
                        onClick={() => {
                          // In a real app, this would update the order status
                          console.log('Update status for order:', order.id)
                        }}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>No Orders Found</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            {statusFilter === 'all' 
              ? "No orders match your search criteria."
              : `No ${statusFilter} orders found.`
            }
          </p>
          {statusFilter !== 'all' ? (
            <button 
              onClick={() => setStatusFilter('all')}
              className="btn btn-outline"
              style={{ marginRight: '10px' }}
            >
              Show All Orders
            </button>
          ) : null}
          <Link to="/create" className="btn">
            Create First Order
          </Link>
        </div>
      )}
    </div>
  )
}
