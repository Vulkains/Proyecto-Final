import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import Usuarios from './components/Usuarios';
import Productos from './components/Productos';
import Servicios from './components/Servicios';
import Ordenes from './components/Ordenes';
import Categorias from './components/Categorias';
import Ubicaciones from './components/Ubicaciones';

import './App.css';

// Nueva Funcion que agregamos para devolvernos al menu principal
function BotonVolver() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      style={{
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: '20px',
      }}
    >
      ← Volver al Menú Principal
    </button>
  );
}

function UsuariosConVolver() {
  return (
    <main style={{ maxWidth: 700, margin: '30px auto', padding: 30, background: 'white', borderRadius: 12, boxShadow: '0 6px 12px rgba(0,0,0,0.05)' }}>
      <BotonVolver />
      <Usuarios />
    </main>
  );
}

// 
function ProductosConVolver() {
  return (
    <main style={{ maxWidth: 700, margin: '30px auto', padding: 30, background: 'white', borderRadius: 12, boxShadow: '0 6px 12px rgba(0,0,0,0.05)' }}>
      <BotonVolver />
      <Productos />
    </main>
  );
}

// Este es el menu principal
function Dashboard() {
  return (
    <main className="dashboard" style={{ maxWidth: 700, margin: '30px auto', padding: 30, display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
      <Link to="/usuarios" className="card">🧑‍💼 <span>Usuarios</span></Link>
      <Link to="/productos" className="card">📦 <span>Productos</span></Link>
      <Link to="/servicios" className="card">🛠️ <span>Servicios</span></Link>
      <Link to="/ordenes" className="card">📋 <span>Órdenes</span></Link>
      <Link to="/categorias" className="card">🗂️ <span>Categorías</span></Link>
      <Link to="/ubicaciones" className="card">📍 <span>Ubicaciones</span></Link>
    </main>
  );
}

function App() {
  return (
    <Router>
      <header style={{ backgroundColor: '#007BFF', color: 'white', padding: '20px 0', textAlign: 'center' }}>
        <h1>Panel de Control</h1>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/usuarios" element={<UsuariosConVolver />} />
        <Route path="/productos" element={<ProductosConVolver />} />
        <Route path="/servicios" element={
          <main style={{ maxWidth: 700, margin: '30px auto', padding: 30, background: 'white', borderRadius: 12, boxShadow: '0 6px 12px rgba(0,0,0,0.05)' }}>
            <BotonVolver />
            <Servicios />
          </main>
        } />
        <Route path="/ordenes" element={
          <main style={{ maxWidth: 700, margin: '30px auto', padding: 30, background: 'white', borderRadius: 12, boxShadow: '0 6px 12px rgba(0,0,0,0.05)' }}>
            <BotonVolver />
            <Ordenes />
          </main>
        } />
        <Route path="/categorias" element={
          <main style={{ maxWidth: 700, margin: '30px auto', padding: 30, background: 'white', borderRadius: 12, boxShadow: '0 6px 12px rgba(0,0,0,0.05)' }}>
            <BotonVolver />
            <Categorias />
          </main>
        } />
        <Route path="/ubicaciones" element={
          <main style={{ maxWidth: 700, margin: '30px auto', padding: 30, background: 'white', borderRadius: 12, boxShadow: '0 6px 12px rgba(0,0,0,0.05)' }}>
            <BotonVolver />
            <Ubicaciones />
          </main>
        } />
      </Routes>
    </Router>
  );
}

export default App;
