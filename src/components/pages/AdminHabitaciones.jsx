import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../index.css";
import CardsHabitaciones from "../pages/habitaciones/CardsHabitaciones";
import { useState } from "react";

const AdminHabitaciones = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [habitaciones, setHabitaciones] = useState([
    // Esta primera habitacion lo use de ejemplo usando _id de los datos de MongoDB ya creados para usarlos como prueba para borrar hasta que el create este conectado
    // el id usado en esta habitacion ya no existe porque fue borrada, pero lo dejo como referencia
    
    {
      _id: "692ce1be834ac53fe142dada",
      numero: 36,
      tipo: "matrimonial",
      precio: 15000,
      estado: "disponible",
      img: "https://images.pexels.com/photos/34989794/pexels-photo-34989794.jpeg",
    },
    {
      id: 2,
      numero: "204",
      tipo: "Doble",
      precio: 220,
      estado: "Ocupada",
      img: "https://images.pexels.com/photos/276224/pexels-photo-276224.jpeg",
    },
    {
      id: 3,
      numero: "301",
      tipo: "Suite",
      precio: 350,
      estado: "Mantenimiento",
      img: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
    },
  ]);

  const onSubmit = (data) => {
    console.log("Datos validados:", data);

    Swal.fire({
      title: "Habitación guardada",
      text: "Los datos se han registrado correctamente",
      icon: "success",
    });

    reset();
  };

  const borrarHabitacion = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar esta habitación?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("Intentando borrar ID:", id); // 1. Ver qué ID estamos enviando

          const response = await fetch(
            `http://localhost:3000/api/habitaciones/${id}`,
            {
              method: "DELETE",
            }
          );

          console.log("Respuesta del server (Status):", response.status); // 2. Ver el código de respuesta (200, 404, 500?)

          if (response.ok) {
            // Usamos 'hab._id' porque MongoDB usa guion bajo, y 'hab.id' para los ejemplos falsos.
            setHabitaciones(
              habitaciones.filter((hab) => (hab._id || hab.id) !== id)
            );

            Swal.fire({
              title: "¡Eliminado!",
              text: "La habitación ha sido eliminada de la base de datos.",
              icon: "success",
            });
          } else {
            // Si falla, leemos el mensaje de error del backend
            const mensajeError = await response.json();
            console.log("Error detallado:", mensajeError);

            Swal.fire(
              "Error",
              `No se pudo eliminar. Código: ${response.status}`,
              "error"
            );
          }
        } catch (error) {
          console.error("Error de red:", error);
          Swal.fire("Error", "Fallo de conexión con el servidor.", "error");
        }
      }
    });
  };

  return (
    <Container className="my-5">
      <Row className="gap-4 justify-content-center">
        {/* --------------------------------------
            COLUMNA IZQUIERDA: FORMULARIO
        --------------------------------------- */}
        <Col md={4} className="p-4 border rounded bg-light">
          <h3 className="mb-4 fw-bold">Agregar Nueva Habitación</h3>

          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Número */}
            <Form.Group className="mb-3">
              <Form.Label>Número de Habitación</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 101"
                {...register("numero", {
                  required: "El número de habitación es obligatorio",
                  min: { value: 1, message: "Debe ser mayor o igual a 1" },
                  max: { value: 500, message: "Debe ser menor o igual a 500" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.numero?.message}
              </Form.Text>
            </Form.Group>

            {/* Tipo */}
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Habitación</Form.Label>
              <Form.Select
                {...register("tipo", {
                  required: "Debe seleccionar un tipo de habitación",
                })}
              >
                <option value="">Seleccionar tipo</option>
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="matrimonial">Matrimonial</option>
                <option value="suite">Suite</option>
                <option value="familiar">Familiar</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.tipo?.message}
              </Form.Text>
            </Form.Group>

            {/* Precio */}
            <Form.Group className="mb-3">
              <Form.Label>Precio por Noche ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 150"
                {...register("precio", {
                  required: "El precio es obligatorio",
                  min: { value: 1, message: "Debe ser mayor que 0" },
                  max: { value: 200000, message: "Máximo permitido: $200.000" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.precio?.message}
              </Form.Text>
            </Form.Group>

            {/* Capacidad */}
            <Form.Group className="mb-3">
              <Form.Label>Capacidad (Huéspedes)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 2"
                {...register("capacidad", {
                  required: "La capacidad es obligatoria",
                  min: { value: 1, message: "Mínimo 1 huésped" },
                  max: { value: 10, message: "Máximo 10 huéspedes" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.capacidad?.message}
              </Form.Text>
            </Form.Group>

            {/* Piso */}
            <Form.Group className="mb-3">
              <Form.Label>Piso</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 3"
                {...register("piso", {
                  required: "El piso es obligatorio",
                  min: { value: 0, message: "Debe ser al menos 0" },
                  max: { value: 15, message: "Máximo piso permitido: 15" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.piso?.message}
              </Form.Text>
            </Form.Group>

            {/* Metros */}
            <Form.Group className="mb-3">
              <Form.Label>Metros Cuadrados</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 25"
                {...register("metros", {
                  required: "Los metros cuadrados son obligatorios",
                  min: { value: 5, message: "Mínimo 5 m2" },
                  max: { value: 200, message: "Máximo 200 m2" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.metros?.message}
              </Form.Text>
            </Form.Group>

            {/* Características */}
            <Form.Group className="mb-3">
              <Form.Label>Características Clave</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Balcón, Smart TV"
                {...register("caracteristicas", {
                  required: "Las características son obligatorias",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  maxLength: { value: 80, message: "Máximo 80 caracteres" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.caracteristicas?.message}
              </Form.Text>
            </Form.Group>

            {/* Descripción */}
            <Form.Group className="mb-3">
              <Form.Label>Descripción Detallada</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe la habitación..."
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                  minLength: {
                    value: 10,
                    message: "Debe tener al menos 10 caracteres",
                  },
                  maxLength: { value: 500, message: "Máximo 500 caracteres" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.descripcion?.message}
              </Form.Text>
            </Form.Group>

            {/* Estado */}
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <div className="d-flex flex-wrap gap-3 mt-2">
                {[
                  "disponible",
                  "ocupada",
                  "reservada",
                  "limpieza",
                  "mantenimiento",
                ].map((estado) => (
                  <Form.Check
                    type="radio"
                    key={estado}
                    label={estado.charAt(0).toUpperCase() + estado.slice(1)}
                    value={estado}
                    {...register("estado", {
                      required: "Debe seleccionar un estado",
                    })}
                  />
                ))}
              </div>
              <Form.Text className="text-danger">
                {errors.estado?.message}
              </Form.Text>
            </Form.Group>

            {/* Imagen */}
            <Form.Group className="mb-4">
              <Form.Label>Foto de la Habitación (URL)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: https://example.com/habitacion.jpg"
                {...register("imagen", {
                  required: "Debe proporcionar una imagen",
                  pattern: {
                    value: /(https?:\/\/.*\.(?:png|jpg|jpeg|webp|svg))/i,
                    message: "Debe ser una URL válida de imagen",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.imagen?.message}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Guardar Habitación
            </Button>
          </Form>
        </Col>

        {/* --------------------------------------
            COLUMNA DERECHA: LISTADO
        --------------------------------------- */}
        <Col md={7} className="p-4 border rounded bg-white">
          <h3 className="mb-4 fw-bold">Habitaciones Existentes</h3>
          {/* CORRECCIÓN: Usamos 'habitaciones' en lugar de 'habitacionesEjemplo' */}
          {habitaciones.length > 0 ? (
            <CardsHabitaciones
              habitaciones={habitaciones}
              borrarHabitacion={borrarHabitacion}
            />
          ) : (
            <p className="text-muted">No hay habitaciones para mostrar.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHabitaciones;
