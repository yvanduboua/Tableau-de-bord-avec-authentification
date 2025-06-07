import { createContext, useState, useEffect } from 'react';

// Default context value
const defaultValue = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
};

// Create context
export const AuthContext = createContext(defaultValue);

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('admin_user');
      
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('admin_user');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Mock login function (replace with real API call)
  const login = async (email, password) => {
    // For demo purposes only - in a real app this would be an API call
    if (email === 'admin@example.com' && password === 'admin123') {
      const userData = {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        avatar: 'https://i.pravatar.cc/150?u=admin',
      };
      
      setUser(userData);
      localStorage.setItem('admin_user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}