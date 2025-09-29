import type { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAppContext } from '../../contexts/AppContext.js'

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const { basePath, user } = useAppContext();
  
  const navItems = [
    { name: 'All Orders', href: '/list', icon: '🛒' },
    { name: 'Create Order', href: '/create', icon: '➕' },
    { name: 'Analytics', href: '/analytics', icon: '📊' },
  ];

  // Check if current path matches the navigation item (considering basePath)
  const isActive = (href: string) => {
    const fullPath = `${basePath}${href}`;
    return location.pathname === fullPath;
  };

  return (
    <div className="sidebar-layout">
      <aside className="sidebar">
        <h3>Orders</h3>
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                to={`${basePath}${item.href}`}
                className={isActive(item.href) ? 'active' : ''}
              >
                <span style={{ marginRight: '8px' }}>{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {basePath && (
          <div style={{ 
            marginTop: '20px', 
            padding: '10px', 
            fontSize: '12px', 
            color: '#666',
            borderTop: '1px solid #eee'
          }}>
            <strong>BasePath:</strong> <code>{basePath}</code>
          </div>
        )}
        {user && (
          <div style={{ 
            marginTop: '15px', 
            padding: '12px', 
            fontSize: '12px', 
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            border: '2px solid #007bff'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              marginBottom: '8px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#007bff',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                {user.avatar || user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#495057' }}>{user.name}</div>
                <div style={{ color: '#6c757d', textTransform: 'capitalize' }}>{user.role}</div>
              </div>
            </div>
            <div style={{ 
              fontSize: '11px', 
              color: '#28a745',
              fontWeight: '500'
            }}>
              🔄 User state shared from Host!
            </div>
          </div>
        )}
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
