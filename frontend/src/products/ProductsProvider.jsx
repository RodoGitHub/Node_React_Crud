import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/GlobalContext";
import { 
  createObject,
  getObjects,
  updateObject, 
  deleteObject,
} from "../services/APIData";

const ProductProvider = ({ children }) => {
  const [listProduct, setListProduct] = useState([]);
  const [modeEdit , setModeEdit] = useState(false)
  const [productId , setProductId] = useState(null)
  const [product , setProduct] = useState({
    name:"",
    price: "",
    stock: ""
  });

const navigate = useNavigate();

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    const response = await getObjects("products");
    if (response.status === 200) {
      setListProduct(response.data.data);
    }
    else{
      setListProduct([]);
    }
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};


const handleCreate = async (data) => {
  try {
    const response = await createObject("products", data);
    if (response && response.status === 201) {
      alert("Producto creado correctamente.");
      navigate(`/productos`)
      fetchProducts();
      return;
    }

    if (response && response.status === 409) { 
      alert("Error producto repetido. Intenta nuevamente.");
      console.error("Error producto repetido:", response.status);  
      return;
    }
  } catch (error) {
    console.error("Error creando producto:", error);
  }
};


const handleDelete = async (id) => {
  try {
    const response = await deleteObject("products", id);
    if (response && response.status === 200) {
      fetchProducts(); 
    } else {
      console.error("Error al eliminar el producto:", response.status);
    }
  } catch (error) {
    console.error("Error eliminando producto:", error);
  }
};


const handleUpdate = async (id, data) => {
  try {
    const response = await updateObject("products", id, data);
    if (response && response.status === 200) {
      navigate(`/productos`);
      fetchProducts(); 
    } else {
      console.error("Error al actualizar el producto:", response.status);
    }
  } catch (error) {
    console.error("Error actualizando producto:", error);
  }
};

  return (
    <ProductContext.Provider
      value={{
        listProduct,
        
        handleCreate,
        handleDelete,
        handleUpdate,
        
        modeEdit,
        product,
        productId, 
        
        setProduct,
        setProductId,
        setModeEdit
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
