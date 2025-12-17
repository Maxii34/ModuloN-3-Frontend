import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { actualizarHabitacion } from "../../services/habitacionesAPI";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Modales.css";
import { editarHabitacion, obtenerHabitacionPorId } from "../../services/habitacionesAPI";

const ModalEditarHabitacion = ({ show, onHide, habitacion, onHabitacionEditada }) => {
  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
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
    if (show && habitacion?._id) {
      cargarDatosHabitacion();
    }
  }, [show, habitacion]);

  // Reset form cuando se cierra el modal para evitar valores stale
  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset]);

  const onSubmit = async (data) => {
  const cargarDatosHabitacion = async () => {
    try {
      setCargandoDatos(true);
      const datos = await obtenerHabitacionPorId(habitacion._id);
      
      // Resetear el formulario con los datos obtenidos
      reset({
        numero: datos.numero,
        tipo: datos.tipo,
        precio: datos.precio,
        capacidad: datos.capacidad,
        piso: datos.piso,
        metros: datos.metros,
        caracteristicas: datos.caracteristicas || "",
        descripcion: datos.descripcion || "",
        estado: datos.estado,
        imagen: datos.imagen || "",
      });
    } catch (error) {
      console.error("Error al cargar datos de la habitación:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudieron cargar los datos de la habitación",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setCargandoDatos(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setCargando(true);
      
      // Asegurar que tipo y estado estén en minúsculas como espera el backend
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
      // Validación preventiva del precio antes de enviar
      // Nota: no forzamos un máximo en el frontend; dejamos que el backend valide según su modelo.
      if (datosFormateados.precio < 0) {
        Swal.fire("Error", "El precio debe ser mayor o igual a 0", "error");
        return;
      }

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
      
      const id = habitacion._id || habitacion.id;
      await editarHabitacion(id, datosFormateados);

      Swal.fire({
        title: "¡Habitación actualizada!",
        text: "Los datos se han actualizado correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Cerrar modal y recargar lista
      onHide();
      if (onHabitacionEditada) {
        onHabitacionEditada();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar. Revisa la conexión o tus permisos.",
        icon: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  const handleClose = () => {
    reset();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-pencil-fill me-2"></i>
          Editar Habitación {habitacion?.numero}
        </Modal.Title>
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
              {...register("precio", {
                required: "Precio obligatorio",
                min: { value: 0, message: "El precio debe ser mayor o igual a 0" },
              })}
            />
            <Form.Text className="text-danger">{errors.precio?.message}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              {...register("capacidad", { required: "Capacidad obligatoria" })}
            />
            <Form.Text className="text-danger">{errors.capacidad?.message}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Piso</Form.Label>
            <Form.Control
              type="number"
              {...register("piso", { required: "Piso obligatorio" })}
            />
            <Form.Text className="text-danger">{errors.piso?.message}</Form.Text>
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
              {errors.imagen?.message}
            </Form.Text>
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
        {cargandoDatos ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 text-muted">Cargando datos de la habitación...</p>
          </div>
        ) : (
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
              <Form.Text className="text-danger">{errors.numero?.message}</Form.Text>
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
                  max: { value: 200000, message: "Máximo permitido: $200.000" },
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
              <Button variant="secondary" onClick={handleClose} disabled={cargando}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" disabled={cargando}>
                {cargando ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg me-2"></i>
                    Guardar Cambios
                  </>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditarHabitacion;
