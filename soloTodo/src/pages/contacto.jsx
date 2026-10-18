import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Text from '../components/atoms/Text';
import ContactForm from '../components/organisms/ContactForm';
import '../styles/contacto.css';

function Contacto() {
    const [formulario, setFormulario] = useState({ nombre: '', email: '', mensaje: '' });
    const [enviado, setEnviado] = useState(false);

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviado(true);
        setFormulario({ nombre: '', email: '', mensaje: '' });
    };

    return (
        <Container className="my-5 contacto-container">
            <Text variant="h2" className="text-center mb-3 contacto-titulo">
                CONTACTO
            </Text>
            <Text variant="p" className="text-center text-light mb-4">
                ¿Tienes alguna duda o sugerencia? Escríbenos y te responderemos lo más rápido posible.
            </Text>

            {enviado && (
                <div className="alert alert-success text-center" role="alert">
                    ¡Mensaje enviado correctamente!
                </div>
            )}

            <ContactForm 
                formulario={formulario}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </Container>
    );
}

export default Contacto;