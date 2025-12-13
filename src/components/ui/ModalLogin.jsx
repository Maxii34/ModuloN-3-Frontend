import { Button, Modal, Form } from "react-bootstrap";
import "./Modales.css";
import { useForm } from "react-hook-form";

export const ModalLogin = ({ showLogin, loginClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmi = (data) => {
    console.log(data);
    //Agregar logica de login.
    reset();
  };


  return (
    <>
      <Modal show={showLogin} onHide={loginClose}>
        <Modal.Body>
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

            <Button variant="primary" type="submit" className="w-100">
              Iniciar Sesión
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
