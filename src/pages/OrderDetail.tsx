import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { mockOrders } from '../data/mockOrders.js'
import type { Order } from '../types/index.js'

export const OrderDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const foundOrder = mockOrders.find(o => o.id === id)
      setOrder(foundOrder || null)
      setLoading(false)
    }
  }, [id])

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

  const getOrderTimeline = (order: Order) => {
    const statuses = ['pending', 'processing', 'shipped', 'delivered']
    const currentIndex = statuses.indexOf(order.status)
    
    return statuses.map((status, index) => ({
      status,
      label: status.charAt(0).toUpperCase() + status.slice(1),
      completed: index <= currentIndex && order.status !== 'cancelled',
      isCurrent: status === order.status,
      date: index === currentIndex ? order.updatedAt : 
            index < currentIndex ? order.createdAt : null
    }))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div>Loading order...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Order Not Found</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          The order you're looking for doesn't exist.
        </p>
        <Link to="/list" className="btn">
          ← Back to Orders
        </Link>
      </div>
    )
  }

  const timeline = getOrderTimeline(order)

  return (
    <div>
      <div className="page-header">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-outline"
            style={{ marginRight: '15px' }}
          >
            ← Back
          </button>
          <Link to="/list" className="btn btn-outline">
            All Orders
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <button className="btn btn-secondary">
              📦 Update Status
            </button>
          )}
          <button className="btn">
            📄 Print Invoice
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Order {order.orderNumber}</h2>
              <span className={`badge ${getStatusBadgeClass(order.status)}`} style={{ fontSize: '14px' }}>
                {order.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <h4>Customer Information</h4>
                <p><strong>{order.customerName}</strong></p>
                <p>Customer ID: {order.customerId}</p>
              </div>
              <div>
                <h4>Order Details</h4>
                <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(order.updatedAt).toLocaleString()}</p>
              </div>
            </div>

            <h4>Items Ordered</h4>
            <table className="order-table" style={{ marginBottom: '0' }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td><strong>${(item.quantity * item.price).toFixed(2)}</strong></td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid #dee2e6', fontWeight: 'bold' }}>
                  <td colSpan={3}>Total</td>
                  <td>${order.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card">
            <h4>Shipping Address</h4>
            <div style={{ lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 5px 0' }}>{order.shippingAddress.street}</p>
              <p style={{ margin: '0 0 5px 0' }}>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p style={{ margin: 0 }}>{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <h4>Order Status Timeline</h4>
            <div className="order-timeline">
              {timeline.map((item) => (
                <div 
                  key={item.status}
                  className={`order-timeline-item ${item.completed ? 'completed' : ''}`}
                >
                  <div style={{ fontWeight: item.isCurrent ? 'bold' : 'normal' }}>
                    {item.label}
                  </div>
                  {item.date && (
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {new Date(item.date).toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
              
              {order.status === 'cancelled' && (
                <div className="order-timeline-item" style={{ color: '#dc3545' }}>
                  <div style={{ fontWeight: 'bold' }}>Cancelled</div>
                  <div style={{ fontSize: '12px' }}>
                    {new Date(order.updatedAt).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h4>Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button className="btn btn-outline">
                📧 Email Customer
              </button>
              <button className="btn btn-outline">
                🔄 Duplicate Order
              </button>
              <button className="btn btn-outline">
                📋 Export Details
              </button>
              {order.status !== 'cancelled' && (
                <button 
                  className="btn" 
                  style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                  onClick={() => {
                    if (confirm('Are you sure you want to cancel this order?')) {
                      console.log('Cancel order:', order.id)
                    }
                  }}
                >
                  ❌ Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
