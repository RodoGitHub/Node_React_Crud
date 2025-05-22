import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/GlobalContext";
import { exportToPdf } from "../utils/ExportoPdf";
import { jwtDecode } from 'jwt-decode';
import { getLocalObjects } from '../hooks/localStorage';

const ProductsView = () => {
  const { 
    listProduct,
    handleDelete, 
    setProductId, 
    setProduct, 
    setModeEdit,
  } = useContext(ProductContext);
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
          <h2 className="text-center mb-0">Lista de Productos</h2>
        </div>
        <div className="col-8 text-end">

          {(decoded.role === "admin") && (
            <button
              className="btn btn-success me-2"
              onClick={() => navigate(`form/`)}
            >
                Crear un Producto
            </button>  
            )}
  
        </div>
      </div>
      
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
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
            {listProduct.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay productos cargados.
                </td>
              </tr>
            ) : (
              listProduct.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
                  
                  {(decoded.role === "admin" || decoded.role === "edit") && (
                    <>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setProduct({
                              name: p.name,
                              price: p.price,
                              stock: p.stock
                            });
                            setProductId(p.id);
                            setModeEdit(true);
                            navigate(`editar/${p.id}`);
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
          onClick={() => exportToPdf(listProduct, 'Listado de Producto', ['ID', 'Nombre', 'Precio', 'Stock'])}
        >
          Exportar a PDF
        </button>
      </div>
    </div>
  );
};

export default ProductsView;
