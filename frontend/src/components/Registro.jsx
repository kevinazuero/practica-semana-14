import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Registro({ setVista }) {
  const [datos, setDatos] = useState({ nombre: '', email: '', password: '', edad: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/registro`, datos);
      alert('Usuario registrado exitosamente');
      setVista('login');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegistro}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={datos.nombre}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={datos.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={datos.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={datos.edad}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
          Registrar
        </button>
      </form>
      <p>
        ¿Ya tienes cuenta?{' '}
        <span onClick={() => setVista('login')} style={{ color: 'blue', cursor: 'pointer' }}>
          Iniciar Sesión
        </span>
      </p>
    </div>
  );
}

export default Registro;