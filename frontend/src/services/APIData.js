import axios from 'axios';
import { getLocalObjects , removeLastObjectId } from "../hooks/localStorage";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Interceptor para inyectar el token en cada request
api.interceptors.request.use(
  config => {
    const tokenData = getLocalObjects("userLogin");
    const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para manejar expiración de token
api.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 403) {
      alert("Sesión expirada. Iniciá sesión de nuevo.");
      removeLastObjectId("userLogin");
      window.location.assign("/usuarios/login");
    }
    return Promise.reject(error);
  }
);

export default api;

// Funciones

export const loginObject = async (object, data) => {
  try {
    return await api.post(`/${object}`, data);
  } catch (error) {
    console.error("Error login:", error);
    return error.response;
  }
};

export const createObject = async (object, data) => {
  try {
    return await api.post(`/${object}`, data);
  } catch (error) {
    console.error("Error creando:", error);
    return error.response;
  }
};

export const updateObject = async (object, id, data) => {
  try {
    return await api.put(`/${object}/${id}`, data);
  } catch (error) {
    console.error("Error actualizando:", error);
    return null;
  }
};

export const deleteObject = async (object, id) => {
  try {
    return await api.delete(`/${object}/${id}`);
  } catch (error) {
    console.error("Error borrando:", error);
    return null;
  }
};

export const getObjects = async (object) => {
  try {
    return await api.get(`/${object}`);
  } catch (error) {
    if (error.response) {
      console.error("Error de respuesta:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Error sin respuesta:", error.request);
    } else {
      console.error("Error general:", error.message);
    }
    return { error: true, message: error.message };
  }
};
