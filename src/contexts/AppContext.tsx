import { createContext, useContext, ReactNode } from 'react'

// User interface (ready for Phase 4)
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

// App context interface
export interface AppContextType {
  basePath: string;
  user?: User | null; // Will be populated in Phase 4
}

// Context creation
const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider props interface
interface AppProviderProps {
  children: ReactNode;
  basePath?: string;
  user?: User | null;
}

// Provider component
export const AppProvider = ({ children, basePath = '', user = null }: AppProviderProps) => {
  const value: AppContextType = {
    basePath,
    user,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook for consuming the context
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

// Navigation helper hook
export const useNavigation = () => {
  const { basePath } = useAppContext()
  
  const getPath = (path: string) => `${basePath}${path}`
  
  return { getPath }
}
