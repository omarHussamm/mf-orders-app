import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { mockOrders } from '../data/mockOrders.js'

export const Analytics = () => {
  const [orders] = useState(mockOrders)

  const analytics = useMemo(() => {
    const totalOrders = orders.length
    const pendingOrders = orders.filter(o => o.status === 'pending').length
    const processingOrders = orders.filter(o => o.status === 'processing').length
    const shippedOrders = orders.filter(o => o.status === 'shipped').length
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length
    const cancelledOrders = orders.filter(o => o.status === 'cancelled').length
    
    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, order) => sum + order.total, 0)
    
    const averageOrderValue = totalRevenue / (totalOrders - cancelledOrders) || 0

    const statusBreakdown = [
      { status: 'pending', count: pendingOrders, color: '#ffc107' },
      { status: 'processing', count: processingOrders, color: '#007bff' },
      { status: 'shipped', count: shippedOrders, color: '#6c757d' },
      { status: 'delivered', count: deliveredOrders, color: '#28a745' },
      { status: 'cancelled', count: cancelledOrders, color: '#dc3545' },
    ]

    // Monthly trends (mock data for demonstration)
    const monthlyData = [
      { month: 'Jan', orders: 23, revenue: 4580 },
      { month: 'Feb', orders: 31, revenue: 6220 },
      { month: 'Mar', orders: 28, revenue: 5640 },
      { month: 'Apr', orders: 35, revenue: 7000 },
      { month: 'May', orders: 42, revenue: 8400 },
      { month: 'Jun', orders: 38, revenue: 7600 },
    ]

    const topCustomers = [
      { name: 'John Smith', orders: 5, total: 1249.95 },
      { name: 'Sarah Johnson', orders: 3, total: 899.97 },
      { name: 'Mike Davis', orders: 4, total: 1124.95 },
      { name: 'Emily Brown', orders: 2, total: 559.98 },
    ]

    return {
      totalOrders,
      pendingOrders,
      processingOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      averageOrderValue,
      statusBreakdown,
      monthlyData,
      topCustomers
    }
  }, [orders])

  const getStatusPercentage = (count: number) => {
    return ((count / analytics.totalOrders) * 100).toFixed(1)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Order Analytics</h1>
        <Link to="/list" className="btn btn-outline">
          ← Back to Orders
        </Link>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-number">{analytics.totalOrders}</div>
          <div className="analytics-label">Total Orders</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-number">${analytics.totalRevenue.toFixed(0)}</div>
          <div className="analytics-label">Total Revenue</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-number">${analytics.averageOrderValue.toFixed(0)}</div>
          <div className="analytics-label">Avg Order Value</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-number">{analytics.deliveredOrders}</div>
          <div className="analytics-label">Delivered Orders</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card">
          <h3>Orders by Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {analytics.statusBreakdown.map(item => (
              <div key={item.status}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>
                    {item.status}
                  </span>
                  <span>{item.count} ({getStatusPercentage(item.count)}%)</span>
                </div>
                <div style={{ 
                  height: '8px', 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    height: '100%', 
                    backgroundColor: item.color,
                    width: `${getStatusPercentage(item.count)}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Monthly Trends</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {analytics.monthlyData.map(month => {
              const maxOrders = Math.max(...analytics.monthlyData.map(m => m.orders))
              const width = (month.orders / maxOrders) * 100
              
              return (
                <div key={month.month}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500' }}>{month.month}</span>
                    <span>{month.orders} orders - ${month.revenue}</span>
                  </div>
                  <div style={{ 
                    height: '6px', 
                    backgroundColor: '#f0f0f0', 
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      height: '100%', 
                      backgroundColor: '#007bff',
                      width: `${width}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Top Customers</h3>
        <table className="order-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Orders</th>
              <th>Total Spent</th>
              <th>Average Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {analytics.topCustomers.map((customer, index) => (
              <tr key={index}>
                <td style={{ fontWeight: '500' }}>{customer.name}</td>
                <td>{customer.orders}</td>
                <td style={{ fontWeight: '600' }}>${customer.total.toFixed(2)}</td>
                <td>${(customer.total / customer.orders).toFixed(2)}</td>
                <td>
                  <button 
                    className="btn btn-outline"
                    style={{ padding: '4px 8px', fontSize: '12px' }}
                  >
                    View Orders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card">
          <h3>Quick Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Orders Today:</span>
              <span style={{ fontWeight: '500' }}>3</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Orders This Week:</span>
              <span style={{ fontWeight: '500' }}>12</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Orders This Month:</span>
              <span style={{ fontWeight: '500' }}>38</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Cancellation Rate:</span>
              <span style={{ fontWeight: '500', color: '#dc3545' }}>
                {((analytics.cancelledOrders / analytics.totalOrders) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/create" className="btn">
              ➕ Create New Order
            </Link>
            <button className="btn btn-outline">
              📊 Export Analytics
            </button>
            <button className="btn btn-outline">
              📧 Email Report
            </button>
            <button className="btn btn-outline">
              🔄 Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
