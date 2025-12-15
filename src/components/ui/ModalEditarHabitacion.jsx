import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ModalEditarHabitacion = ({ show, onHide, habitacion, onHabitacionEditada }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  // Cargar datos de la habitación cuando se abre el modal
  useEffect(() => {
    if (habitacion && show) {
      // Usamos setValue para asegurar que los campos se llenen correctamente
      setValue("numero", habitacion.numero);
      setValue("tipo", habitacion.tipo);
      setValue("precio", habitacion.precio);
      setValue("capacidad", habitacion.capacidad);
      setValue("piso", habitacion.piso);
      setValue("metros", habitacion.metros);
      setValue("caracteristicas", habitacion.caracteristicas || "");
      setValue("descripcion", habitacion.descripcion || "");
      setValue("estado", habitacion.estado);
      setValue("imagen", habitacion.imagen || habitacion.img || "");
    }
  }, [habitacion, show, setValue]);

  const onSubmit = async (data) => {
    try {
      // 1. OBTENER ID (Manejo de _id de Mongo o id de prueba)
      const id = habitacion._id || habitacion.id;

      // 2. FORMATEAR DATOS (Convertir strings a números y minúsculas)
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

      // 3. PETICIÓN DIRECTA AL BACKEND (Sin archivos externos)
      const respuesta = await fetch(`http://localhost:3000/api/habitaciones/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosFormateados),
      });

      if (!respuesta.ok) {
        throw new Error("Error al actualizar en el servidor");
      }

      // 4. ÉXITO
      Swal.fire({
        title: "¡Editada!",
        text: "La habitación ha sido actualizada correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Cerrar el modal
      onHide();

      // Avisar al padre (AdminHabitaciones) para que recargue la lista
      if (onHabitacionEditada) {
        onHabitacionEditada();
      }

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar. Revisa que el servidor esté corriendo en el puerto 3000.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Habitación {habitacion?.numero}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditarHabitacion;