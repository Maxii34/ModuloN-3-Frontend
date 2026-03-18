import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const Contacto = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [mensajeExito, setMensajeExito] = useState(false);

  const onSubmit = (data) => {
    console.log("Formulario válido. Datos a enviar:", data);
    setMensajeExito(true);
    reset();
    setTimeout(() => {
      setMensajeExito(false);
    }, 5000);
  };

  const validarEspacios = (value) => {
    if (!value) return true;
    return value.trim().length > 0 || "El campo no puede contener solo espacios";
  };

  return (
    <Container className="my-5">
      <div
        className="p-4 p-md-5 mb-4 rounded shadow-sm border"
        style={{
          backgroundColor: "white",
          color: "#152945",
        }}
      >
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="fw-bolder mb-3 text-primary">Contáctanos</h2>
            <p className="mb-4 text-muted">
              Estamos aquí para ayudarte con reservas, eventos especiales o
              cualquier consulta sobre tu estancia en nuestro hotel.
            </p>
            <div className="d-flex flex-wrap gap-4">
              <p className="mb-0 fw-semibold text-secondary">
                Teléfono:{" "}
                <span className="text-decoration-underline text-dark">
                  +54 381 123 4567
                </span>
              </p>
            </div>
          </Col>

          <Col
            md={4}
            className="pt-4 pt-md-0 ps-md-5 border-start border-secondary border-opacity-25"
          >
            <h5 className="fw-bold mb-3 text-dark">Atención personalizada</h5>
            <div className="d-flex justify-content-between small mb-1">
              <span className="text-muted">Respuesta media</span>
              <span className="fw-semibold text-success">&lt; 2 horas</span>
            </div>
            <div className="d-flex justify-content-between small mb-1">
              <span className="text-muted">Horario hoy</span>
              <span className="fw-semibold">09:00 - 22:00</span>
            </div>
            <div className="d-flex justify-content-between small">
              <span className="text-muted">Idioma</span>
              <span className="fw-semibold">ES / EN</span>
            </div>
          </Col>
        </Row>
      </div>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm border h-100">
            <Card.Body className="p-4 p-md-5">
              <h4 className="fw-bold mb-4">Envíanos un Mensaje</h4>
              <p className="text-muted mb-4">
                Cuéntanos qué necesitas y te responderemos lo antes posible.
              </p>

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Nombre completo *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escribe tu nombre y apellidos"
                    className={errors.nombre ? "is-invalid" : ""}
                    {...register("nombre", {
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 3,
                        message: "El nombre debe tener al menos 3 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "El nombre no puede superar los 50 caracteres",
                      },
                      validate: validarEspacios,
                    })}
                  />
                  {errors.nombre && (
                    <Form.Text className="text-danger">
                      {errors.nombre.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Row className="mb-3 g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Email *</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tucorreo@ejemplo.com"
                        className={errors.email ? "is-invalid" : ""}
                        {...register("email", {
                          required: "El correo electrónico es obligatorio",
                          pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: "Ingresa un formato de correo válido (ej: usuario@mail.com)",
                          },
                        })}
                      />
                      {errors.email && (
                        <Form.Text className="text-danger">
                          {errors.email.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Teléfono</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="+54"
                        className={errors.telefono ? "is-invalid" : ""}
                        {...register("telefono", {
                          pattern: {
                            value: /^[0-9+\-\s()]+$/,
                            message: "Solo se permiten números y símbolos (+, -, ())",
                          },
                        })}
                      />
                      {errors.telefono && (
                        <Form.Text className="text-danger">
                          {errors.telefono.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Tipo de consulta *
                  </Form.Label>
                  <Form.Select
                    defaultValue=""
                    className={errors.tipoConsulta ? "is-invalid" : ""}
                    {...register("tipoConsulta", {
                      required: "Por favor, selecciona el tipo de consulta",
                    })}
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="reserva-existente">Reserva existente</option>
                    <option value="nueva-reserva">Nueva reserva</option>
                    <option value="eventos">Eventos y Grupos</option>
                    <option value="info">Información general</option>
                  </Form.Select>
                  {errors.tipoConsulta && (
                    <Form.Text className="text-danger">
                      {errors.tipoConsulta.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Mensaje *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Indícanos detalles de tu reserva, número de personas o cualquier petición especial."
                    className={errors.mensaje ? "is-invalid" : ""}
                    {...register("mensaje", {
                      required: "El mensaje es obligatorio",
                      minLength: {
                        value: 10,
                        message: "El mensaje debe tener al menos 10 caracteres",
                      },
                      maxLength: {
                        value: 500,
                        message: "El mensaje no puede superar los 500 caracteres",
                      },
                      validate: validarEspacios,
                    })}
                  />
                  {errors.mensaje && (
                    <Form.Text className="text-danger">
                      {errors.mensaje.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 fw-bold py-2"
                >
                  Enviar mensaje
                </Button>
              </Form>

              {mensajeExito && (
                <Alert variant="success" className="mt-4 p-2 text-center small">
                  Mensaje enviado correctamente. Gracias por contactar con nosotros.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm border h-100 p-4">
            <Card.Body>
              <h4 className="fw-bold mb-4">Información de Contacto</h4>

              <div className="d-grid gap-3">
                <div className="d-flex align-items-start">
                  <span className="me-3 fs-5" style={{ color: "#007bff" }}>
                    📍
                  </span>
                  <div>
                    <h6 className="mb-1 fw-semibold">Dirección</h6>
                    <p className="mb-0 text-muted">Tucuman</p>
                    <a href="#" className="small">
                      Ver en mapa
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <span className="me-3 fs-5" style={{ color: "#007bff" }}>
                    📞
                  </span>
                  <div>
                    <h6 className="mb-1 fw-semibold">Teléfono y WhatsApp</h6>
                    <p className="mb-0 text-muted">Tel: +54 381 123 4567</p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <span className="me-3 fs-5" style={{ color: "#007bff" }}>
                    📧
                  </span>
                  <div>
                    <h6 className="mb-1 fw-semibold">Email de reservas</h6>
                    <p className="mb-0 text-muted">sintaxhotel@gmail.com</p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <span className="me-3 fs-5" style={{ color: "#007bff" }}>
                    🕒
                  </span>
                  <div>
                    <h6 className="mb-1 fw-semibold">Horario de atención</h6>
                    <p className="mb-0 text-muted">
                      Lunes a domingo, 09:00 - 22:00
                    </p>
                    <p className="mb-0 small text-success">
                      Respuesta rápida por WhatsApp
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="mt-4 border rounded overflow-hidden"
                style={{ height: "200px", backgroundColor: "#f5f5f5" }}
              >
                <div className="d-flex justify-content-center align-items-center h-100 text-muted small">
                  MAPA DE UBICACIÓN (Placeholder)
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};