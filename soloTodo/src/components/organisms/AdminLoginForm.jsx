import React from 'react';
import Text from '../atoms/Text';
import Input from '../atoms/Input';

function AdminLoginForm({ credenciales, setCredenciales, onSubmit, errorLogin }) {
  return (
    <div
      style={{
        backgroundColor: '#141414',
        border: '2px solid #3afff8',
        borderRadius: '18px',
        padding: '35px 30px',
        boxShadow: '0 0 20px rgba(58, 255, 248, 0.25)'
      }}
    >
      <Text variant="h2" className="text-center mb-4" style={{ color: '#3afff8', fontWeight: '900' }}>
        ACCESO ADMINISTRATIVO
      </Text>

      {errorLogin && (
        <div
          style={{
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '15px',
            backgroundColor: 'rgba(255, 77, 77, 0.15)',
            border: '1px solid #ff4d4d',
            color: '#ff6b6b',
            fontSize: '0.88rem',
            textAlign: 'center'
          }}
        >
          {errorLogin}
        </div>
      )}

      <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
        <div>
          <Text variant="label" className="admin-label">Usuario Admin</Text>
          <Input
            type="text"
            placeholder="Ingresa 'admin'"
            value={credenciales.usuario}
            onChange={(e) => setCredenciales({ ...credenciales, usuario: e.target.value })}
            required
          />
        </div>

        <div>
          <Text variant="label" className="admin-label">Clave de Seguridad</Text>
          <Input
            type="password"
            placeholder="Ingresa 'admin123'"
            value={credenciales.password}
            onChange={(e) => setCredenciales({ ...credenciales, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn-sesion-neon py-3 mt-2" style={{ cursor: 'pointer', width: '100%' }}>
          INGRESAR AL PANEL
        </button>
      </form>
    </div>
  );
}

export default AdminLoginForm;