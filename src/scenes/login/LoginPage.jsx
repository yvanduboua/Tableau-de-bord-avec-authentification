import React from 'react'
import { useNavigate } from 'react-router-dom';
import useState from 'react';
import { Lock } from 'react-feather';
import './login.css';
import { useAuth } from './useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
    // Variables d'état pour l'e-mail, le mot de passe, le message d'erreur et l'état de chargement
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const Input = ({ id, type, label, ...props }) => (
  <div className="input-group">
    <label htmlFor={id} className="input-label">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="input-field"
      {...props}
    />
  </div>
);

const Button = ({ children, isLoading, ...props }) => (
  <button
    className={`button ${isLoading ? 'loading' : ''}`}
    disabled={isLoading}
    {...props}
  >
    {isLoading ? 'Loading...' : children}
  </button>
);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="text-center mb-8">
          <div className="icon-container">
            <Lock size={28} className="icon" />
          </div>
          <h1 className="title">Admin Dashboard</h1>
          <p className="subtitle">Sign in to your account</p>
        </div>
        
        <div className="form-content">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="form-fields">
              <Input
                id="email"
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                required
              />
              
              <Input
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              
              <div className="button-container">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </form>
          
          <div className="demo-credentials">
            <p className="demo-text">
              Demo credentials: admin@example.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage