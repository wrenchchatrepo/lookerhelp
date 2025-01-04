import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Home />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
