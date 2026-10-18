import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AuthForm from '../components/organisms/AuthForm';
import '../styles/login.css';

function Login() {
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

  const handleToggleModo = () => {
    setEsRegistro(!esRegistro);
    setMensaje({ texto: '', tipo: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios_juegotodo')) || [];

    if (esRegistro) {
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

      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem('usuarios_juegotodo', JSON.stringify(usuariosGuardados));
      localStorage.setItem('usuarioLogueado', JSON.stringify(nuevoUsuario));

      setMensaje({ texto: '¡Cuenta creada con éxito! Entrando a Juegotodo...', tipo: 'exito' });

      setTimeout(() => {
        window.location.href = '/';
      }, 1200);

    } else {
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
    <Container className="my-5">
      <AuthForm
        esRegistro={esRegistro}
        formulario={formulario}
        mensaje={mensaje}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggleModo={handleToggleModo}
      />
    </Container>
  );
}

export default Login;