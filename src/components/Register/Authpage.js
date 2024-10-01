// AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authpage.css';  // Import the CSS file

const AuthPage = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission for both login and signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Handle login
      try {
        const response = await fetch('http://localhost:5000/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log('Login response:', data);  // Log the login response to check the data

        if (response.ok) {
          if (data.token && data.user) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.username);
            setToken(data.token);
            navigate('/dashboard');
          } else {
            setMessage('Login successful but missing token or user data');
          }
        } else {
          setMessage('Invalid email or password');
        }
      } catch (error) {
        console.error('Error logging in:', error);  // Log the error
        setMessage('Error logging in');
      }
    } else {
      // Handle signup
      try {
        const response = await fetch('http://localhost:5000/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, firstname, lastname, email, password }),
        });

        const data = await response.json();
        console.log('Signup response:', data);  // Log the signup response to check the data

        if (response.ok) {
          if (data.token && data.user) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.user.email);
            setToken(data.token);
            navigate('/dashboard');
          } else {
            setMessage('Signup successful but missing token or user data');
          }
        } else {
          setMessage('Error signing up');
        }
      } catch (error) {
        console.error('Error signing up:', error);  // Log the error
        setMessage('Error signing up');
      }
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-page">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last Name"
                required
              />
            </>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button type="submit" className="submit-btn">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
