import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../index.css";
import CardsHabitaciones from "../pages/habitaciones/CardsHabitaciones";
import ModalEditarHabitacion from "../ui/ModalEditarHabitacion";

const AdminHabitaciones = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [habitaciones, setHabitaciones] = useState([]);
  
  // ESTADOS PARA EL MODAL
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  // --- LEER (GET) ---
  const obtenerHabitaciones = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/habitaciones");
      const datos = await respuesta.json();
      setHabitaciones(datos);
    } catch (error) {
      console.error("Error al cargar habitaciones:", error);
    }
  };

  useEffect(() => {
    obtenerHabitaciones();
  }, []);

  // --- CREAR (POST) ---
  const onSubmit = async (data) => {
    try {
      const habitacionNueva = {
        numero: parseInt(data.numero),
        tipo: data.tipo,
        precio: parseFloat(data.precio),
        estado: data.estado,
        // CAMBIO 1: Enviamos 'imagenes' (plural) al Backend
        imagenes: data.imagenes, 
        capacidad: parseInt(data.capacidad),
        piso: parseInt(data.piso),
        metros: parseInt(data.metros),
        caracteristicas: data.caracteristicas,
        descripcion: data.descripcion,
      };

      const response = await fetch("http://localhost:3000/api/habitaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitacionNueva),
      });

      if (response.ok) {
        Swal.fire({
          title: "¡Creada!",
          text: "La habitación se guardó correctamente",
          icon: "success",
        });
        reset();
        obtenerHabitaciones();
      } else {
        Swal.fire("Error", "No se pudo guardar la habitación", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Fallo de conexión", "error");
    }
  };

  // --- BORRAR (DELETE) ---
  const borrarHabitacion = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/habitaciones/${id}`,
            { method: "DELETE" }
          );

          if (response.ok) {
            setHabitaciones(habitaciones.filter((hab) => (hab._id || hab.id) !== id));
            Swal.fire("¡Eliminado!", "La habitación fue eliminada.", "success");
          } else {
            Swal.fire("Error", "No se pudo eliminar.", "error");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Fallo de conexión.", "error");
        }
      }
    });
  };

  // LÓGICA DEL MODAL 
  const handleEditarHabitacion = (habitacion) => {
    setHabitacionSeleccionada(habitacion);
    setShowModalEditar(true);
  };

  const handleHabitacionEditada = () => {
    obtenerHabitaciones();
  };

  return (
    <Container className="my-5">
      <Row className="gap-4 justify-content-center">
        {/* COLUMNA IZQUIERDA: FORMULARIO CREAR */}
        <Col md={4} className="p-4 border rounded bg-light">
          <h3 className="mb-4 fw-bold">Agregar Nueva Habitación</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            {/* ... (Inputs de Número, Tipo, Precio, Capacidad, Piso, Metros, Características, Descripción, Estado IGUAL QUE ANTES) ... */}
            
            <Form.Group className="mb-3">
              <Form.Label>Número</Form.Label>
              <Form.Control type="number" placeholder="Ej: 101" {...register("numero", { required: "Obligatorio" })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Select {...register("tipo", { required: "Obligatorio" })}>
                <option value="">Seleccionar tipo</option>
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="matrimonial">Matrimonial</option>
                <option value="suite">Suite</option>
                <option value="familiar">Familiar</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio ($)</Form.Label>
              <Form.Control type="number" {...register("precio", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control type="number" {...register("capacidad", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Piso</Form.Label>
              <Form.Control type="number" {...register("piso", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Metros</Form.Label>
              <Form.Control type="number" {...register("metros", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Características</Form.Label>
              <Form.Control type="text" {...register("caracteristicas", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} {...register("descripcion", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <div className="d-flex flex-wrap gap-3 mt-2">
                {["disponible", "ocupada", "reservada", "mantenimiento"].map(
                  (estado) => (
                    <Form.Check
                      type="radio"
                      key={estado}
                      label={estado.charAt(0).toUpperCase() + estado.slice(1)}
                      value={estado}
                      {...register("estado", { required: true })}
                    />
                  )
                )}
              </div>
            </Form.Group>

            {/* CAMBIO 2: Input para 'imagenes' */}
            <Form.Group className="mb-4">
              <Form.Label>Imagen URL</Form.Label>
              <Form.Control 
                type="text" 
                {...register("imagenes", { required: true })} 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Guardar Habitación
            </Button>
          </Form>
        </Col>

        {/* COLUMNA DERECHA: LISTADO */}
        <Col md={7} className="p-4 border rounded bg-white">
          <h3 className="mb-4 fw-bold">Habitaciones Existentes</h3>
          {habitaciones.length > 0 ? (
            <CardsHabitaciones
              habitaciones={habitaciones}
              borrarHabitacion={borrarHabitacion}
              onEditarHabitacion={handleEditarHabitacion} 
            />
          ) : (
            <p className="text-muted">No hay habitaciones registradas.</p>
          )}
        </Col>
      </Row>

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