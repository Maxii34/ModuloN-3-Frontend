import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./Modales.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { iniciarSesion } from "../../services/usuariosAPI";
import Swal from "sweetalert2";

export const ModalLogin = ({ showLogin, loginClose, registerShow }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loginAdmin, loginUser } = useAuth();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);

  const RegistrateAki = () => {
    registerShow();
    loginClose();
  };

  const onSubmi = async (data) => {
    try {
      setCargando(true);
      const respuesta = await iniciarSesion(data.email, data.password);
      
      // Guardar token y datos del usuario
      const datosUsuario = {
        email: respuesta.usuario.email,
        tipo: respuesta.usuario.tipo,
        nombre: respuesta.usuario.nombre,
        apellido: respuesta.usuario.apellido,
        id: respuesta.usuario.id,
        token: respuesta.token,
      };

      if (respuesta.usuario.tipo === "admin") {
        loginAdmin(datosUsuario);
        loginClose();
        navigate("/admin-dashboard");
      } else {
        loginUser(datosUsuario);
        loginClose();
        navigate("/");
      }

      Swal.fire({
        title: "¡Bienvenido!",
        text: respuesta.mensaje || "Inicio de sesión exitoso",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudo iniciar sesión",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Modal show={showLogin} onHide={loginClose}>
        <Modal.Body className="">
          <Form className=" css-modal-login" onSubmit={handleSubmit(onSubmi)}>
            <div className="text-center mb-2">
              <h1 className="mb-2">Bienvenido</h1>
              <div>
                <span className="text-muted">
                  Inicie sesión con su cuenta para continuar
                </span>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@Email.com"
                {...register("email", {
                  required: "El email es requerido",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "El email no es válido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                {...register("password", {
                  required: "El password es requerido",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{8,}$/,
                    message: "El password no es válido",
                  },
                })}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </Form.Group>

            <div className="text-center mt-3 mb-3">
              <span className="text-muted">¿Aún no tienes cuenta? </span>
              <Link
                onClick={RegistrateAki}
                className="text-primary text-decoration-none fw-semibold"
              >
                Regístrate aquí
              </Link>
            </div>

            <Button variant="primary" type="submit" className="w-100" disabled={cargando}>
              {cargando ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="m-0 p-0">
          <Button variant="secondary" onClick={loginClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
