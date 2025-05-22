import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from '../context/GlobalContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserLogin = () => {
    const {
        handleLogin,
    } = useContext(UserContext);

    const navigate = useNavigate();

    const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Debe ser un correo electrónico válido')
        .required('El email es obligatorio'),
        
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    });

    const initialValues = {  email: '', password: '' };

    return (
        <div className="container my-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Inicio sesion</h2>

                <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleLogin(values);
                }}
                enableReinitialize
                >
                {() => (
        
                    <Form>
                        <div className="row g-3">
                        <div className="col-md-6">
                            <div className="form-floating">
                            <Field
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Correo electrónico"
                                autoComplete="email"
                            />
                            <label htmlFor="email">Email</label>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger small mt-1"
                            />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                            <Field
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                autoComplete="current-password"
                            />
                            <label htmlFor="password">Contraseña</label>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger small mt-1"
                            />
                            </div>
                        </div>

                        <div className="col-12 d-flex mt-4">
                            <button
                                type="button"
                                className="btn btn-primary px-4"
                                onClick={() => navigate('/')}
                            >
                                Home
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary px-4 ms-auto"
                            >
                                Iniciar Sesión
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

export default UserLogin;
