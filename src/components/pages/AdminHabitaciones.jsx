import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../index.css";
import CardsHabitaciones from "../pages/habitaciones/CardsHabitaciones";
import ModalEditarHabitacion from "../ui/ModalEditarHabitacion";
import { obtenerHabitaciones, crearHabitacion, eliminarHabitacion, editarHabitacion } from "../../services/habitacionesAPI";

const AdminHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Función para cargar las habitaciones del backend
  const cargarHabitaciones = async () => {
    try {
      setCargando(true);
      setError(null);
      const datos = await obtenerHabitaciones();
      setHabitaciones(datos);
    } catch (err) {
      console.error("Error al cargar habitaciones:", err);
      setError("No se pudieron cargar las habitaciones. Verifica que el servidor esté ejecutándose.");
    } finally {
      setCargando(false);
    }
  };

  // Cargar habitaciones al montar el componente
  useEffect(() => {
    cargarHabitaciones();
  }, []);

  // Manejar edición de habitación
  const handleEditarHabitacion = (habitacion) => {
    setHabitacionSeleccionada(habitacion);
    setShowModalEditar(true);
  };

  // Callback después de editar
  const handleHabitacionEditada = () => {
    cargarHabitaciones();
  };

  // Manejar eliminación de habitación
  const handleEliminarHabitacion = async (habitacion) => {
    const resultado = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará la habitación ${habitacion.numero}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      try {
        const id = habitacion._id || habitacion.id;
        await eliminarHabitacion(id);

        Swal.fire({
          title: "¡Eliminada!",
          text: "La habitación ha sido eliminada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        cargarHabitaciones(); // Recargar la lista
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message || "No se pudo eliminar la habitación",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  // Crear nueva habitación
  const onSubmit = async (data) => {
    try {
      // Asegurar que tipo y estado estén en minúsculas como espera el backend
      const datosFormateados = {
        ...data,
        tipo: data.tipo?.toLowerCase(),
        estado: data.estado?.toLowerCase(),
        numero: Number(data.numero),
        precio: Number(data.precio),
        capacidad: Number(data.capacidad),
        piso: Number(data.piso),
        metros: Number(data.metros),
      };
      
      await crearHabitacion(datosFormateados);

      Swal.fire({
        title: "¡Habitación guardada!",
        text: "Los datos se han registrado correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      cargarHabitaciones(); // Recargar la lista
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudo crear la habitación",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
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
                  max: { value: 500, message: "Debe ser menor o igual a 500" }
                })}
              />
              <Form.Text className="text-danger">{errors.numero?.message}</Form.Text>
            </Form.Group>

            {/* Tipo */}
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Habitación</Form.Label>
              <Form.Select
                {...register("tipo", { required: "Debe seleccionar un tipo de habitación" })}
              >
                <option value="">Seleccionar tipo</option>
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="matrimonial">Matrimonial</option>
                <option value="suite">Suite</option>
                <option value="familiar">Familiar</option>
              </Form.Select>
              <Form.Text className="text-danger">{errors.tipo?.message}</Form.Text>
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
                  max: { value: 200000, message: "Máximo permitido: $200.000" }
                })}
              />
              <Form.Text className="text-danger">{errors.precio?.message}</Form.Text>
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
              <Form.Text className="text-danger">{errors.capacidad?.message}</Form.Text>
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
              <Form.Text className="text-danger">{errors.piso?.message}</Form.Text>
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
              <Form.Text className="text-danger">{errors.metros?.message}</Form.Text>
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
              <Form.Text className="text-danger">{errors.caracteristicas?.message}</Form.Text>
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
                  minLength: { value: 10, message: "Debe tener al menos 10 caracteres" },
                  maxLength: { value: 500, message: "Máximo 500 caracteres" },
                })}
              />
              <Form.Text className="text-danger">{errors.descripcion?.message}</Form.Text>
            </Form.Group>

            {/* Estado */}
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <div className="d-flex flex-wrap gap-3 mt-2">
                {["disponible", "ocupada", "reservada", "limpieza", "mantenimiento"].map(
                  (estado) => (
                    <Form.Check
                      type="radio"
                      key={estado}
                      label={estado.charAt(0).toUpperCase() + estado.slice(1)}
                      value={estado}
                      {...register("estado", {
                        required: "Debe seleccionar un estado",
                      })}
                    />
                  )
                )}
              </div>
              <Form.Text className="text-danger">{errors.estado?.message}</Form.Text>
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
              <Form.Text className="text-danger">{errors.imagen?.message}</Form.Text>
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

          {cargando ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3 text-muted">Cargando habitaciones...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
              <Button 
                variant="outline-danger" 
                size="sm" 
                className="ms-3"
                onClick={cargarHabitaciones}
              >
                Reintentar
              </Button>
            </div>
          ) : habitaciones.length === 0 ? (
            <p className="text-muted text-center py-5">
              No hay habitaciones registradas. Agrega una nueva habitación usando el formulario.
            </p>
          ) : (
            <CardsHabitaciones 
              habitaciones={habitaciones} 
              onEditarHabitacion={handleEditarHabitacion}
              onEliminarHabitacion={handleEliminarHabitacion}
            />
          )}
        </Col>

      </Row>

      {/* Modal para editar habitación */}
      <ModalEditarHabitacion
        show={showModalEditar}
        onHide={() => {
          setShowModalEditar(false);
          setHabitacionSeleccionada(null);
        }}
        habitacion={habitacionSeleccionada}
        onHabitacionEditada={handleHabitacionEditada}
      />
    </Container>
  );
};

export default AdminHabitaciones;