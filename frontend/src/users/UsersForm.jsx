import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from '../context/GlobalContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserForm = () => {
  const {
    handleCreate,
    handleUpdate,
    modeEdit,
    user,
    setUserId,
    setModeEdit,
    roles,
  } = useContext(UserContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (id) {
      setUserId(id);
    }
  }, [id, setUserId]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Debe tener mínimo 3 caracteres')
      .max(30, 'Debe tener menos de 30 caracteres')
      .required('Nombre es obligatorio'),
    email: Yup.string()
      .email('Debe ser un correo electrónico válido')
      .required('Email es obligatorio'),
    age: Yup.number()
      .min(1, 'La edad mínima es 1 años')
      .max(100, 'La edad máxima es 100 años')
      .required('Edad es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Contraseña es obligatoria'),
    role: Yup.string()
      .required('Rol es obligatorio'),
  });

  const initialValues = modeEdit
    ? user
    : { name: '', email: '', age: '', password: '', role: '' };

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">{modeEdit ? "Editar Usuario" : "Crear Usuario"}</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            if (modeEdit) {
              handleUpdate(id, values);
            } else {
              handleCreate(values);
            }
            resetForm();
            setModeEdit(false);
            
          }}
          enableReinitialize
        >
          {() => (
            <Form>
              {alertMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {alertMessage}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              )}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <Field name="name" className="form-control" placeholder="Nombre del Usuario" />
                    <label htmlFor="name">Nombre</label>
                    <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-floating">
                    <Field name="email" className="form-control" placeholder="Email" />
                    <label htmlFor="email">Email</label>
                    <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-floating">
                    <Field name="age" className="form-control" placeholder="Edad" />
                    <label htmlFor="age">Edad</label>
                    <ErrorMessage name="age" component="div" className="text-danger small mt-1" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <Field name="password" type="password" className="form-control" placeholder="Contraseña" />
                    <label htmlFor="password">Contraseña</label>
                    <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <Field as="select" name="role" className="form-select">
                      <option value="">Seleccionar rol</option>
                      {Array.isArray(roles) && roles.map((role) => (
                        <option key={role} value={role}>
                          {role === 'admin'
                            ? 'Administrador'
                            : role === 'edit'
                            ? 'Editor'
                            : role === 'view'
                            ? 'Solo Lectura'
                            : role}
                        </option>
                      ))}
                    </Field>
                    <label htmlFor="role">Rol</label>
                    <ErrorMessage name="role" component="div" className="text-danger small mt-1" />
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => {
                      setModeEdit(false);
                      navigate('/usuarios/lista');
                    }}
                  >
                    Ir a lista de Usuarios
                  </button>
                  <button type="submit" className="btn btn-primary px-4">
                    {modeEdit ? 'Guardar Cambios' : 'Crear Usuario'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserForm;
