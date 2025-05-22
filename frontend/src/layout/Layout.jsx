import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getLocalObjects } from '../hooks/localStorage';
import { GlobalContext } from '../context/GlobalContext';

function LayoutView() {
  const { handleLogout } = useContext(GlobalContext);

  const token = getLocalObjects("userLogin");
  let decoded = null;

  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.warn("Token inválido:", err.message);
    }
  }

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>CRUD</Navbar.Brand>

          {decoded && (
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/usuarios/lista">Usuarios</Nav.Link>
              <Nav.Link href="/productos">Productos</Nav.Link>
            </Nav>
          )}

          <Nav className="ms-auto">
            {!decoded && (
              <Nav.Link href="/usuarios/login" className='btn btn-outline-warning'>
                Inicio Sesión
              </Nav.Link>
            )}

            {decoded && (
              <>
                {decoded.role === "admin" && (
                  <Nav.Link href="/usuarios/form">Registrar Usuario</Nav.Link>
                )}
                <Nav.Link>activo: {decoded.email}</Nav.Link>
                <Nav.Link>rol: {decoded.role}</Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  className="btn btn-outline-warning ms-4"
                >
                  Cerrar Sesión
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet /> {}
      </Container>
    </>
  );
}

export default LayoutView;
