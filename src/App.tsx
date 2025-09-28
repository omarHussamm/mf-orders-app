import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout.js'
import { OrderList } from './pages/OrderList.js'
import { OrderDetail } from './pages/OrderDetail.js'
import { CreateOrder } from './pages/CreateOrder.js'
import { Analytics } from './pages/Analytics.js'

// Flag to determine if app runs standalone or as a federated remote
const STANDALONE = false // Set to false when running in federation mode

interface AppProps {
  basePath?: string;
}

function App({ basePath = '' }: AppProps) {
  const AppContent = (
    <AppLayout basePath={basePath}>
      <Routes>
        <Route path="/" element={<Navigate to={STANDALONE ? "/list" : `${basePath}/list`} replace />} />
        <Route path="/list" element={<OrderList basePath={basePath} />} />
        <Route path="/detail/:id" element={<OrderDetail basePath={basePath} />} />
        <Route path="/create" element={<CreateOrder basePath={basePath} />} />
        <Route path="/analytics" element={<Analytics basePath={basePath} />} />
        <Route path="*" element={
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Page Not Found</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              The page you're looking for doesn't exist.
            </p>
            <Navigate to={STANDALONE ? "/list" : `${basePath}/list`} replace />
          </div>
        } />
      </Routes>
    </AppLayout>
  )

  // Conditionally wrap with BrowserRouter for standalone mode
  return STANDALONE ? (
    <BrowserRouter>
      {AppContent}
    </BrowserRouter>
  ) : (
    AppContent
  )
}

export default App
