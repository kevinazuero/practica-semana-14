import { useState } from 'react';
import Login from './components/Login';
import Registro from './components/Registro';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [token, setToken] = useState(() => {
    // Inicializar desde localStorage
    const tokenGuardado = localStorage.getItem('token');

    // Verificar si hay token de Google en la URL
    const params = new URLSearchParams(window.location.search);
    const tokenGoogle = params.get('token');

    if (tokenGoogle) {
      localStorage.setItem('token', tokenGoogle);
      window.history.replaceState({}, document.title, '/');
      return tokenGoogle;
    }

    return tokenGuardado;
  });

  const [vista, setVista] = useState('login');

  if (token) {
    return <Dashboard token={token} setToken={setToken} />;
  }

  return (
    <div className="App">
      {vista === 'login' ? (
        <Login setToken={setToken} setVista={setVista} />
      ) : (
        <Registro setVista={setVista} />
      )}
    </div>
  );
}

export default App;