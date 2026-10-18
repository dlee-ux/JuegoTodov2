import React, { useState } from 'react';
import '../styles/global.css';

function Login() {
  // Permite alternar entre la vista de Iniciar Sesión y la de Registrarse
  const [esRegistro, setEsRegistro] = useState(false);

  const [formulario, setFormulario] = useState({
    usuario: '',
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Leemos los usuarios que ya están guardados en el navegador
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios_juegotodo')) || [];

    if (esRegistro) {
      // --- MODO REGISTRO ---
      const existe = usuariosGuardados.find(
        (u) =>
          u.email.toLowerCase() === formulario.email.toLowerCase() ||
          u.usuario.toLowerCase() === formulario.usuario.toLowerCase()
      );

      if (existe) {
        setMensaje({ texto: 'Ese nombre de usuario o correo ya está registrado.', tipo: 'error' });
        return;
      }

      const nuevoUsuario = {
        id: Date.now(),
        usuario: formulario.usuario,
        email: formulario.email,
        password: formulario.password
      };

      // Guardamos en la lista permanente de usuarios
      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem('usuarios_juegotodo', JSON.stringify(usuariosGuardados));

      // También lo dejamos con la sesión iniciada de inmediato
      localStorage.setItem('usuarioLogueado', JSON.stringify(nuevoUsuario));

      setMensaje({ texto: '¡Cuenta creada con éxito! Entrando a Juegotodo...', tipo: 'exito' });

      setTimeout(() => {
        window.location.href = '/';
      }, 1200);

    } else {
      // --- MODO INICIAR SESIÓN ---
      // Permite entrar escribiendo el Nombre de Usuario O el Correo
      const usuarioValido = usuariosGuardados.find(
        (u) =>
          (u.email.toLowerCase() === formulario.email.toLowerCase() ||
            u.usuario.toLowerCase() === formulario.email.toLowerCase()) &&
          u.password === formulario.password
      );

      if (usuarioValido) {
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioValido));
        setMensaje({ texto: `¡Bienvenido de nuevo, ${usuarioValido.usuario}!`, tipo: 'exito' });

        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        setMensaje({ texto: 'Usuario/correo o contraseña incorrectos.', tipo: 'error' });
      }
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '460px' }}>
      <div
        style={{
          backgroundColor: '#141414',
          border: '2px solid #3afff8',
          borderRadius: '18px',
          padding: '35px 30px',
          boxShadow: '0 0 20px rgba(0, 255, 204, 0.25)'
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: '#3afff8', fontWeight: '900', letterSpacing: '1px' }}
        >
          {esRegistro ? 'CREAR CUENTA' : 'INICIAR SESIÓN'}
        </h2>

        {mensaje.texto && (
          <div
            style={{
              padding: '12px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: 'bold',
              backgroundColor: mensaje.tipo === 'error' ? 'rgba(255, 60, 60, 0.15)' : 'rgba(0, 255, 204, 0.15)',
              border: `1.5px solid ${mensaje.tipo === 'error' ? '#ff4d4d' : '#3afff8'}`,
              color: mensaje.tipo === 'error' ? '#ff6b6b' : '#3afff8'
            }}
          >
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {esRegistro && (
            <div>
              <label className="form-label" style={{ color: '#3afff8', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Nombre de Usuario
              </label>
              <input
                type="text"
                name="usuario"
                className="form-control bg-dark text-white p-3"
                style={{ border: '1px solid #3afff8', borderRadius: '10px' }}
                placeholder="Ej: crist"
                value={formulario.usuario}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div>
            <label className="form-label" style={{ color: '#3afff8', fontSize: '0.9rem', fontWeight: 'bold' }}>
              {esRegistro ? 'Correo Electrónico' : 'Correo o Nombre de Usuario'}
            </label>
            <input
              type={esRegistro ? 'email' : 'text'}
              name="email"
              className="form-control bg-dark text-white p-3"
              style={{ border: '1px solid #3afff8', borderRadius: '10px' }}
              placeholder={esRegistro ? 'tucorreo@ejemplo.com' : 'Ingresa tu usuario o correo'}
              value={formulario.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="form-label" style={{ color: '#3afff8', fontSize: '0.9rem', fontWeight: 'bold' }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              className="form-control bg-dark text-white p-3"
              style={{ border: '1px solid #3afff8', borderRadius: '10px' }}
              placeholder="••••••••"
              value={formulario.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-sesion-neon mt-3 py-3"
            style={{ width: '100%', fontSize: '1rem', cursor: 'pointer' }}
          >
            {esRegistro ? 'REGISTRARME' : 'ENTRAR'}
          </button>
        </form>

        <div className="text-center mt-4 pt-2" style={{ borderTop: '1px solid #2a2a2a' }}>
          <p style={{ color: '#cccccc', marginBottom: '8px', fontSize: '0.95rem' }}>
            {esRegistro ? '¿Ya tienes una cuenta guardada?' : '¿Aún no tienes cuenta en Juegotodo?'}
          </p>
          <button
            type="button"
            onClick={() => {
              setEsRegistro(!esRegistro);
              setMensaje({ texto: '', tipo: '' });
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#3afff8',
              fontWeight: 'bold',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            {esRegistro ? 'Inicia sesión aquí' : 'Regístrate gratis aquí'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;