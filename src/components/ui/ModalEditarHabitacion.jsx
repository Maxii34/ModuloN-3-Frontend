import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { actualizarHabitacion } from "../../services/habitacionesAPI";

const ModalEditarHabitacion = ({
  show,
  onHide,
  habitacion,
  onHabitacionEditada,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Cargar datos de la habitación cuando se abre el modal
  useEffect(() => {
    if (habitacion && show) {
      setValue("numero", habitacion.numero);
      setValue("tipo", habitacion.tipo);
      setValue("precio", habitacion.precio);
      setValue("capacidad", habitacion.capacidad);
      setValue("piso", habitacion.piso);
      setValue("caracteristicas", habitacion.caracteristicas || "");
      setValue("descripcion", habitacion.descripcion || "");
      setValue("estado", habitacion.estado);
      // ✅ IMPORTANTE: Si en la DB se guarda como 'metros', cámbialo aquí:
      setValue("metrosCuadrados", habitacion.metros || habitacion.metrosCuadrados);
      // ✅ Consistencia con el nombre del campo de imagen
      setValue("imagen", habitacion.imagen || habitacion.imagenes || "");
    }
  }, [habitacion, show, setValue]);

  const onSubmit = async (data) => {
    try {
      const id = habitacion._id || habitacion.id;

      const datosFormateados = {
        ...data,
        numero: Number(data.numero),
        precio: Number(data.precio),
        capacidad: Number(data.capacidad),
        piso: Number(data.piso),
        metros: Number(data.metrosCuadrados), // ✅ Enviamos 'metros' al backend
        imagen: data.imagen // ✅ Consistencia de nombre
      };

      // ✅ Usamos la query que ya tiene el puerto y el token correcto
      const respuesta = await actualizarHabitacion(id, datosFormateados);

      // Si la query devuelve los datos o un ok
      if (respuesta) {
        Swal.fire({
          title: "¡Editada!",
          text: "La habitación ha sido actualizada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        onHabitacionEditada(); // Refresca la lista
        onHide(); // Cierra el modal
        reset(); // Limpia el formulario
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar. Revisa la conexión o tus permisos.",
        icon: "error",
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
          <Form.Group className="mb-3">
            <Form.Label>Número de Habitación</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 101"
              {...register("numero", { required: "Obligatorio" })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select {...register("tipo", { required: "Obligatorio" })}>
              <option value="individual">Individual</option>
              <option value="doble">Doble</option>
              <option value="matrimonial">Matrimonial</option>
              <option value="suite">Suite</option>
              <option value="familiar">Familiar</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio ($)</Form.Label>
            <Form.Control
              type="number"
              {...register("precio", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              {...register("capacidad", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Piso</Form.Label>
            <Form.Control
              type="number"
              {...register("piso", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Metros Cuadrados</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 25"
              {...register("metrosCuadrados", {
                required: "Los metros cuadrados son obligatorios",
                min: { value: 5, message: "Mínimo 5" },
              })}
            />
            <Form.Text className="text-danger">
              {errors.metrosCuadrados?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Características</Form.Label>
            <Form.Control
              type="text"
              {...register("caracteristicas", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("descripcion", { required: true })}
            />
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

          <Form.Group className="mb-4">
            <Form.Label>Imagen URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://example.com/habitacion.jpg"
              {...register("imagen", {
                required: "Debe proporcionar una imagen",
              })}
            />
            <Form.Text className="text-danger">
              {errors.imagenes?.message}
            </Form.Text>
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
