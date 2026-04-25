import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../index.css";
import CardsHabitaciones from "../pages/habitaciones/CardsHabitaciones";
import ModalEditarHabitacion from "../ui/ModalEditarHabitacion";
import { crearHabitacion } from "../helpers/queries";
import { eliminarHabitacion } from "../../services/habitacionesAPI";

const AdminHabitaciones = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [habitaciones, setHabitaciones] = useState([]);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  const habitacionesBack = import.meta.env.VITE_API_HABITACIONES;

  const obtenerHabitaciones = async () => {
    try {
      const respuesta = await fetch(habitacionesBack);
      const datos = await respuesta.json();
      setHabitaciones(datos);
    } catch (error) {
      console.error("Error al cargar habitaciones:", error);
    }
  };

  useEffect(() => {
    obtenerHabitaciones();
  }, []);

  const onSubmit = async (data) => {
    try {
      const habitacionNueva = {
        numero: parseInt(data.numero),
        tipo: data.tipo,
        precio: parseFloat(data.precio),
        estado: data.estado,
        imagen: data.imagen,
        capacidad: parseInt(data.capacidad),
        piso: parseInt(data.piso),
        metros: parseInt(data.metrosCuadrados), 
        caracteristicas: data.caracteristicas,
        descripcion: data.descripcion,
        fechasOcupadas: [] 
      };

      const respuesta = await crearHabitacion(habitacionNueva);
      
      if (respuesta && (respuesta.status === 201 || respuesta.status === 200)) {
        Swal.fire("¡Creada!", "La habitación se guardó correctamente", "success");
        reset();
        obtenerHabitaciones();
      } else {
        const mensaje = respuesta?.datos?.mensaje || "No se pudo guardar";
        Swal.fire("Error", mensaje, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Fallo de conexión", "error");
    }
  };

  const borrarHabitacion = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminarán también las reservas de esta habitación.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await eliminarHabitacion(id);
        if (respuesta && (respuesta.status === 200 || respuesta.ok)) {
          setHabitaciones(habitaciones.filter((hab) => (hab._id || hab.id) !== id));
          Swal.fire("Eliminado", "Habitación borrada.", "success");
        }
      }
    });
  };

  const handleEditarHabitacion = (habitacion) => {
    setHabitacionSeleccionada(habitacion);
    setShowModalEditar(true);
  };

  return (
    <Container className="my-5">
      <Row className="gap-4 justify-content-center">
        {/* FORMULARIO COMPLETO */}
        <Col md={4} className="p-4 border rounded bg-light shadow-sm">
          <h3 className="mb-4 fw-bold">Nueva Habitación</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Número</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ej: 101"
                {...register("numero", { 
                  required: "Debe ingresar el número identificador de la habitación",
                  min: { value: 1, message: "El número no puede ser 0 o negativo" }
                })} 
              />
              {errors.numero && <span className="text-danger small">{errors.numero.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Tipo</Form.Label>
              <Form.Select 
                {...register("tipo", { required: "Debe seleccionar una categoría de la lista" })}
              >
                <option value="">Seleccione una categoría...</option>
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="matrimonial">Matrimonial</option>
                <option value="suite">Suite</option>
                <option value="familiar">Familiar</option>
              </Form.Select>
              {errors.tipo && <span className="text-danger small">{errors.tipo.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Precio por noche ($)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ej: 15000"
                {...register("precio", { 
                  required: "Debe ingresar el valor en pesos por noche",
                  min: { value: 0, message: "El precio no puede ser negativo" }
                })} 
              />
              {errors.precio && <span className="text-danger small">{errors.precio.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Capacidad de personas</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ej: 2"
                {...register("capacidad", { 
                  required: "Indique para cuántas personas está equipada",
                  min: { value: 1, message: "Debe tener capacidad para al menos 1 persona" }
                })} 
              />
              {errors.capacidad && <span className="text-danger small">{errors.capacidad.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Piso</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ej: 1"
                {...register("piso", { 
                  required: "Indique en qué piso se encuentra (Use 0 para Planta Baja)",
                  min: { value: 0, message: "El piso no puede ser negativo" }
                })} 
              />
              {errors.piso && <span className="text-danger small">{errors.piso.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Tamaño (Metros Cuadrados)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ej: 25"
                {...register("metrosCuadrados", { 
                  required: "Ingrese el tamaño de la habitación en m²",
                  min: { value: 1, message: "El tamaño debe ser mayor a 0 m²" }
                })} 
              />
              {errors.metrosCuadrados && <span className="text-danger small">{errors.metrosCuadrados.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Características principales</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ej: TV 50', Wifi, Balcón, Frigobar"
                {...register("caracteristicas", { 
                  required: "Mencione al menos una comodidad incluida",
                  minLength: { value: 5, message: "Detalle un poco más las características" }
                })} 
              />
              {errors.caracteristicas && <span className="text-danger small">{errors.caracteristicas.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Descripción detallada</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Describa la habitación, la vista, el tipo de cama y el ambiente para atraer al cliente..."
                maxLength={250}
                {...register("descripcion", { 
                  required: "Debe escribir un texto descriptivo para que el cliente la lea",
                  minLength: { value: 10, message: "Escriba una descripción más larga (mínimo 10 letras)" },
                  maxLength: { value: 250, message: "La descripción es muy larga, resúmala un poco" }
                })} 
              />
              {errors.descripcion && <span className="text-danger small">{errors.descripcion.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Estado Inicial</Form.Label>
              <div className="d-flex flex-wrap gap-3 mt-1">
                <Form.Check 
                  type="radio" 
                  id="estado-disponible"
                  label="Lista para usar (Disponible)" 
                  value="disponible" 
                  {...register("estado", { required: "Debe marcar en qué estado se encuentra" })} 
                />
                <Form.Check 
                  type="radio" 
                  id="estado-mantenimiento"
                  label="En refacción (Mantenimiento)" 
                  value="mantenimiento" 
                  {...register("estado", { required: "Debe marcar en qué estado se encuentra" })} 
                />
              </div>
              {errors.estado && <span className="text-danger small d-block mt-1">{errors.estado.message}</span>}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Link de la Fotografía</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ej: https://misitio.com/foto-habitacion.jpg"
                {...register("imagen", { 
                  required: "Debe pegar el link (URL) de la foto de la habitación",
                  pattern: {
                    value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                    message: "Asegúrese de copiar un enlace válido que empiece con http:// o https://"
                  }
                })} 
              />
              {errors.imagen && <span className="text-danger small">{errors.imagen.message}</span>}
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 py-2 fw-bold shadow-sm">
              <i className="bi bi-floppy me-2"></i>Guardar Habitación
            </Button>
          </Form>
        </Col>

        {/* LISTADO */}
        <Col md={7} className="p-4 border rounded bg-white shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0">Habitaciones Registradas</h3>
            <Badge bg="dark text-white fs-6">{habitaciones.length} Creadas</Badge>
          </div>
          <CardsHabitaciones
            habitaciones={habitaciones}
            borrarHabitacion={borrarHabitacion}
            onEditarHabitacion={handleEditarHabitacion}
          />
        </Col>
      </Row>

      <ModalEditarHabitacion
        show={showModalEditar}
        onHide={() => { setShowModalEditar(false); setHabitacionSeleccionada(null); }}
        habitacion={habitacionSeleccionada}
        onHabitacionEditada={obtenerHabitaciones}
      />
    </Container>
  );
};

export default AdminHabitaciones;