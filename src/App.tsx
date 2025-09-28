import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout.js'
import { OrderList } from './pages/OrderList.js'
import { OrderDetail } from './pages/OrderDetail.js'
import { CreateOrder } from './pages/CreateOrder.js'
import { Analytics } from './pages/Analytics.js'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<OrderList />} />
          <Route path="/detail/:id" element={<OrderDetail />} />
          <Route path="/create" element={<CreateOrder />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <h2>Page Not Found</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                The page you're looking for doesn't exist.
              </p>
              <Navigate to="/list" replace />
            </div>
          } />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
