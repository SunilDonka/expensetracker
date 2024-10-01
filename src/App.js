// App.js
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import bg from './Img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './components/Orb/Orb';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Income/Income';
import Expenses from './components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './components/Register/Authpage'; // Import AuthPage for Sign Up / Sign In
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();

  // Check if the user is authenticated by looking for a token in localStorage
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const isAuthenticated = !!token;  // A simple check for authentication

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <Router>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          <Routes>
            {/* Default route to redirect to AuthPage */}
            <Route path="/" element={<AuthPage setToken={setToken} />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <>
                    <Navigation active={active} setActive={setActive} />
                    <main>{displayData()}</main>
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* Redirect any unmatched routes to AuthPage */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MainLayout>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
