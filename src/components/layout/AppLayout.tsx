import type { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

interface AppLayoutProps {
  children: ReactNode;
  basePath?: string;
}

export const AppLayout = ({ children, basePath = '' }: AppLayoutProps) => {
  const location = useLocation();
  
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
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
