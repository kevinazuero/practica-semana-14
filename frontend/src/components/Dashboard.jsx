import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://practica-semana-14.onrender.com/api';

function Dashboard({ token, setToken }) {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuarios(res.data);
    } catch (err) {
      setError('Error al obtener usuarios');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', backgroundColor: '#fff' }}>
      <h2 style={{ color: '#333' }}>Dashboard</h2>
      <button onClick={handleLogout} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Cerrar Sesión
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3 style={{ color: '#333' }}>Lista de Usuarios</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff' }}>
            <th style={{ border: '1px solid #333', padding: '12px', color: '#fff' }}>Nombre</th>
            <th style={{ border: '1px solid #333', padding: '12px', color: '#fff' }}>Email</th>
            <th style={{ border: '1px solid #333', padding: '12px', color: '#fff' }}>Edad</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id} style={{ backgroundColor: '#f9f9f9' }}>
              <td style={{ border: '1px solid #333', padding: '10px', color: '#333' }}>{usuario.nombre}</td>
              <td style={{ border: '1px solid #333', padding: '10px', color: '#333' }}>{usuario.email}</td>
              <td style={{ border: '1px solid #333', padding: '10px', color: '#333' }}>{usuario.edad || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;