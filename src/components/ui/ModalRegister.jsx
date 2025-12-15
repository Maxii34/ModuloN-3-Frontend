import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import "./Modales.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { registrarUsuario } from "../helpers/queries";
import Swal from "sweetalert2";


export const ModalRegister = ({ showRegister, registerClose, loginShow }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const iniciar = () => {
    loginShow();
    registerClose();
  };

  const onSubmi = async (data) => {
    const nuevoUsuario = {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono: data.telefono,
      password: data.password,
      tipo: "usuario"
    }
    
    const respuesta = await registrarUsuario(nuevoUsuario);
    if (!respuesta || !respuesta.ok) {
      const datos = await respuesta.json();
      return Swal.fire({
      title: "Ocurrió un error",
      text: datos?.mensaje || datos?.error || "No se pudo completar el registro.",
      icon: "error",
    });
    }

    const datos = await respuesta.json();
    Swal.fire({
    title: "Bienvenido",
    text: "Te registraste correctamente.",
    icon: "success",
  });
    reset();
    navigate("/");
  };

  return (
    <>
      <Modal show={showRegister} onHide={registerClose} size="lg">
        <Modal.Body>
          <div className="text-center mb-4">
            <h1 className="mb-2">Regístrate</h1>
            <span className="text-muted d-block">
              Completa tus datos para crear una cuenta
            </span>
          </div>

          <Form className="css-modal-register" onSubmit={handleSubmit(onSubmi)}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre"
                    {...register("nombre", {
                      required: "El nombre es requerido",
                      minLength: {
                        value: 3,
                        message: "El nombre debe tener al menos 3 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "El nombre no puede exceder 50 caracteres",
                      },
                    })}
                  />
                  {errors.nombre && (
                    <span className="text-danger">{errors.nombre.message}</span>
                  )}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu apellido"
                    {...register("apellido", {
                      required: "El apellido es requerido",
                      minLength: {
                        value: 3,
                        message: "El apellido debe tener al menos 3 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "El apellido no puede exceder 50 caracteres",
                      },
                    })}
                  />
                  {errors.apellido && (
                    <span className="text-danger">
                      {errors.apellido.message}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
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
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Ingresa tu teléfono"
                    {...register("telefono", {
                      required: "El teléfono es requerido",
                      minLength: {
                        value: 10,
                        message: "El teléfono debe tener al menos 10 dígitos",
                      },
                      maxLength: {
                        value: 15,
                        message: "El teléfono no puede exceder 15 dígitos",
                      },
                      pattern: {
                        value: /^[0-9+\-\s()]*$/,
                        message:
                          "El teléfono solo puede contener números y símbolos válidos",
                      },
                    })}
                  />
                  {errors.telefono && (
                    <span className="text-danger">
                      {errors.telefono.message}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={10}>
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
                    <span className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center mt-3 mb-3">
              <span className="text-muted">¿Si ya tienes cuenta? </span>
              <Link
                onClick={iniciar}
                className="text-primary text-decoration-none fw-semibold"
              >
                Inicia sesion
              </Link>
            </div>

            <div className=" d-flex justify-content-center align-content-center">
              <Button variant="primary" type="submit" className="w-50">
                Registrarse
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="m-0 p-0">
          <Button variant="secondary" onClick={registerClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
