import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/GlobalContext";
import { saveLocalObjects } from "../hooks/localStorage";
import { 
  createObject,
  getObjects,
  loginObject,
  updateObject, 
  deleteObject,
} from "../services/APIData";

const UserProvider = ({ children }) => {
  const [listUser, setListUser] = useState([]);
  const [modeEdit , setModeEdit] = useState(false)
  const [userId , setUserId] = useState(null)
  const [roles , setRoles] = useState("")
  const [user , setUser] = useState({
    name:"",
    email: "",
    age: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();


  useEffect(() => {
    fetchData("users", setListUser);
    fetchData("roles", setRoles);
  }, []);

  const fetchData = async (endpoint, setState) => {
    try {
      const response = await getObjects(endpoint);
      if (response.status === 200) {
        setState(response.data.data);
      } else {
        setState([]);
      }
    } catch (error) {
      console.error(`Error al cargar ${endpoint}:`, error);
      setState([]);
    }
  };

  const handleLogin = async (data) => {
    try{
        const response = await loginObject("auth/login",data)
        if (response && response.status === 200) {
        alert("Usuario logueado correctamente.");
        saveLocalObjects("userLogin", response.data.token)
        navigate("/")
        return;
      } else {
        alert("Credenciales inválidas");
      }
    } catch{

    }
  };

  const handleCreate = async (data) => {
  try {
    const response = await createObject("users", data);

    if (response && response.status === 201) {
      await fetchData("users", setListUser);
      alert("Usuario creado correctamente.");
      navigate(`/usuarios/lista`);
      return;
    }
    if (response && response.status === 409) { 
      alert("El usuario ya existe. Intenta nuevamente. Revise nombre y email.");
      console.error("Error usuario repetido:", response.status);  
      return;
    }
      
    } catch (error) {
      console.error("Error creando usuario:", error);
      alert("Error de conexión. Verifica tu red e intenta nuevamente.");
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await deleteObject("users", id);
      if (response && response.status === 200) {
        await fetchData("users", setListUser); 
      } else {
        console.error("Error al eliminar el usuarios:", response.status);
      }
    } catch (error) {
      console.error("Error eliminando usuarios:", error);
    }
  };


  const handleUpdate = async (id, data) => {
    try {
      const response = await updateObject("users", id, data);
      if (response && response.status === 200) {
        await fetchData("users", setListUser);
        navigate(`/usuarios/lista`);
      } else {
        console.error("Error al actualizar el usuarios:", response.status);
      }
    } catch (error) {
      console.error("Error actualizando usuarios:", error);
    }
  };

    return (
      <UserContext.Provider
        value={{
          listUser,
          
          handleCreate,
          handleDelete,
          handleLogin,
          handleUpdate,
          
          modeEdit,
          roles,
          user,
          userId, 
          
          setUser,
          setUserId,
          setModeEdit
        }}
      >
        {children}
      </UserContext.Provider>
    );
};

export default UserProvider;
