import React from 'react';
import Text from '../atoms/Text';
import Input from '../atoms/Input';

function AuthForm({
  esRegistro,
  formulario,
  mensaje,
  onChange,
  onSubmit,
  onToggleModo
}) {
  return (
    <div className="login-card-container mx-auto">
      <Text variant="h2" className="text-center mb-4 login-title">
        {esRegistro ? 'CREAR CUENTA' : 'INICIAR SESIÓN'}
      </Text>

      {mensaje.texto && (
        <div className={`login-alert ${mensaje.tipo === 'error' ? 'login-alert-error' : 'login-alert-exito'}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
        {esRegistro && (
          <div>
            <Text variant="label" className="login-label">
              Nombre de Usuario
            </Text>
            <Input
              type="text"
              name="usuario"
              placeholder="Ej: crist"
              value={formulario.usuario}
              onChange={onChange}
              required
            />
          </div>
        )}

        <div>
          <Text variant="label" className="login-label">
            {esRegistro ? 'Correo Electrónico' : 'Correo o Nombre de Usuario'}
          </Text>
          <Input
            type={esRegistro ? 'email' : 'text'}
            name="email"
            placeholder={esRegistro ? 'tucorreo@ejemplo.com' : 'Ingresa tu usuario o correo'}
            value={formulario.email}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <Text variant="label" className="login-label">
            Contraseña
          </Text>
          <Input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formulario.password}
            onChange={onChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-sesion-neon mt-3 py-3 w-100"
          style={{ cursor: 'pointer' }}
        >
          {esRegistro ? 'REGISTRARME' : 'ENTRAR'}
        </button>
      </form>

      <div className="text-center mt-4 pt-2 login-toggle-footer">
        <Text variant="p" style={{ color: '#cccccc', marginBottom: '8px', fontSize: '0.95rem' }}>
          {esRegistro ? '¿Ya tienes una cuenta guardada?' : '¿Aún no tienes cuenta en Juegotodo?'}
        </Text>
        <button
          type="button"
          onClick={onToggleModo}
          className="login-toggle-btn"
        >
          {esRegistro ? 'Inicia sesión aquí' : 'Regístrate gratis aquí'}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;