import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useNavigation } from '../contexts/AppContext.js'
import { mockCustomers, mockProducts } from '../data/mockOrders.js'

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export const CreateOrder = () => {
  const navigate = useNavigate()
  const { getPath } = useNavigation()
  const [customerId, setCustomerId] = useState('')
  const [items, setItems] = useState<OrderItem[]>([])
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  })

  const addItem = () => {
    setItems([...items, { productId: '', productName: '', quantity: 1, price: 0 }])
  }

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items]
    if (field === 'productId') {
      const product = mockProducts.find(p => p.id === value)
      if (product) {
        newItems[index] = {
          ...newItems[index],
          productId: product.id,
          productName: product.name,
          price: product.price
        }
      }
    } else {
      newItems[index] = { ...newItems[index], [field]: value }
    }
    setItems(newItems)
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!customerId) {
      alert('Please select a customer')
      return
    }
    
    if (items.length === 0) {
      alert('Please add at least one item')
      return
    }

    if (!shippingAddress.street || !shippingAddress.city) {
      alert('Please fill in shipping address')
      return
    }

    const customer = mockCustomers.find(c => c.id === customerId)
    const orderData = {
      customerId,
      customerName: customer?.name || 'Unknown',
      items,
      shippingAddress,
      total: calculateTotal()
    }

    console.log('Creating order:', orderData)
    alert('Order created successfully!')
    navigate(getPath('/list'))
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Create New Order</h1>
        <Link to={getPath('/list')} className="btn btn-outline">
          ← Back to Orders
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <div>
            <div className="card">
              <h3>Customer Information</h3>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Select Customer *
                </label>
                <select
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                  style={{ width: '100%' }}
                >
                  <option value="">Choose a customer...</option>
                  {mockCustomers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} - {customer.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3>Order Items</h3>
                <button type="button" onClick={addItem} className="btn">
                  ➕ Add Item
                </button>
              </div>

              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', border: '2px dashed #ddd', borderRadius: '8px' }}>
                  <p style={{ color: '#666' }}>No items added yet</p>
                  <button type="button" onClick={addItem} className="btn">
                    Add First Item
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {items.map((item, index) => (
                    <div key={index} style={{ 
                      padding: '15px', 
                      border: '1px solid #ddd', 
                      borderRadius: '8px',
                      backgroundColor: '#f8f9fa'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>
                            Product
                          </label>
                          <select
                            value={item.productId}
                            onChange={(e) => updateItem(index, 'productId', e.target.value)}
                            required
                            style={{ width: '100%' }}
                          >
                            <option value="">Select product...</option>
                            {mockProducts.map(product => (
                              <option key={product.id} value={product.id}>
                                {product.name} - ${product.price}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>
                            Quantity
                          </label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                            min="1"
                            required
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>
                            Subtotal
                          </label>
                          <div style={{ padding: '8px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px' }}>
                            ${(item.quantity * item.price).toFixed(2)}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          style={{
                            padding: '8px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card">
              <h3>Shipping Address</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, street: e.target.value }))}
                    placeholder="123 Main Street"
                    required
                    style={{ width: '100%' }}
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="New York"
                      required
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="NY"
                      required
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                      placeholder="10001"
                      required
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card" style={{ position: 'sticky', top: '20px' }}>
              <h3>Order Summary</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Items ({items.length}):</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Tax:</span>
                  <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
                </div>
                <hr style={{ margin: '15px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span>${(calculateTotal() * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button type="submit" className="btn" style={{ width: '100%' }}>
                  🛒 Create Order
                </button>
                <Link to={getPath('/list')} className="btn btn-outline" style={{ textAlign: 'center', width: '100%' }}>
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
