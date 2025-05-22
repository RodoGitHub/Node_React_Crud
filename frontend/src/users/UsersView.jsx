import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/GlobalContext";
import { exportToPdf } from "../utils/ExportoPdf";
import { jwtDecode } from 'jwt-decode';
import { getLocalObjects } from '../hooks/localStorage';

const UsersView = () => {
  const { 
    listUser,
    handleDelete, 
    setUserId, 
    setUser, 
    setModeEdit,
  } = useContext(UserContext);
  const navigate = useNavigate();
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
    <div className="container my-5 card shadow p-4">
      <div className="row mb-4 align-items-center">
        <div className="col-4">
          <h2 className="text-center mb-0">Lista de Usuarios</h2>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Edad</th>
              <th>Rol Usuario</th>
              {(decoded.role === "admin" || decoded.role === "edit") && (
                <>
                  <th>Editar</th>
                </>
              )}
              {(decoded.role === "admin" ) && (
                <>
                  <th>Eliminar</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {listUser.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay usuarios cargados.
                </td>
              </tr>
            ) : (
              listUser.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.age}</td>
                  <th>{p.role}</th>
                  {(decoded.role === "admin" || decoded.role === "edit") && (
                    <>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setUser({ name: p.name, email: p.email, age: p.age });
                            setUserId(p.id);
                            setModeEdit(true);
                            navigate(`/usuarios/editar/${p.id}`);
                          }}
                        >
                          Editar
                        </button>
                      </td>
                    </>
                  )}
                  {(decoded.role === "admin") && (
                    <>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(p.id)}
                        >
                          Borrar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button
          className="btn btn-outline-primary"
          onClick={() =>
            exportToPdf(listUser, 'Listado de usuarios', [
              'ID',
              'Nombre',
              'Email',
              'Edad',
            ])
          }
        >
          Exportar a PDF
        </button>
      </div>
    </div>

  );
};

export default UsersView;
