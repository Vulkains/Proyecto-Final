import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      Volver al Menú Principal
    </button>
  );
}

export default BotonVolver;
