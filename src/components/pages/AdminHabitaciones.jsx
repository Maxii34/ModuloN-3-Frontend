import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"
import "../../index.css"
import CardsHabitaciones from "../pages/habitaciones/CardsHabitaciones";

const AdminHabitaciones = () => {

  const habitacionesEjemplo = [
    {
      id: 1,
      numero: "101",
      tipo: "Simple",
      precio: 150,
      estado: "Disponible",
      img: "https://images.pexels.com/photos/34983175/pexels-photo-34983175.jpeg",
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
  ];

  return (
    <Container className="my-5">
      <Row className="gap-4 justify-content-center">
        {/* --- Columna Izquierda: Nueva Habitación (Añadido/Modificado) --- */}
        <Col md={4} className="p-4 border rounded bg-light">
          <h3 className="mb-4 fw-bold">Agregar Nueva Habitación</h3>

          <Form>
            {/* Número de Habitación (type="number" para validar min/max) */}
            <Form.Group className="mb-3">
              <Form.Label>Número de Habitación</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ej: 101" 
                min={1} 
                max={1000} 
              />
              <Form.Text className="text-muted">
                Debe ser un número único entre 1 y 1000.
              </Form.Text>
            </Form.Group>

            {/* Tipo de Habitacion (Ajustado a los valores del enum) */}
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Habitación</Form.Label>
              <Form.Select defaultValue="default">
                <option value="default" disabled>Seleccionar tipo</option>
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="matrimonial">Matrimonial</option>
                <option value="suite">Suite</option>
                <option value="familiar">Familiar</option> 
              </Form.Select>
            </Form.Group>

            {/* Precio */}
            <Form.Group className="mb-3">
              <Form.Label>Precio por Noche ($)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ej: 150.00" 
                min={0} 
              />
            </Form.Group>

            {/* Capacidad */}
            <Form.Group className="mb-3">
              <Form.Label>Capacidad (N° de Huéspedes)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ej: 2" 
                min={1} 
              />
            </Form.Group>
            
            {/* Piso */}
            <Form.Group className="mb-3">
              <Form.Label>Piso</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ej: 3" 
                min={0} 
                max={500} 
              />
            </Form.Group>
            
            {/* Metros Cuadrados */}
            <Form.Group className="mb-3">
              <Form.Label>Metros Cuadrados</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ej: 25" 
                min={0} 
                max={600} 
              />
            </Form.Group>

            {/* Características */}
            <Form.Group className="mb-3">
              <Form.Label>Características Clave</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ej: Vista al mar, Balcón, Smart TV" 
                minLength={2} 
                maxLength={50} 
              />
              <Form.Text className="text-muted">
                Palabras clave separadas por comas.
              </Form.Text>
            </Form.Group>

            {/* Descripción */}
            <Form.Group className="mb-3">
              <Form.Label>Descripción Detallada</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Detalles sobre el diseño, mobiliario y comodidades." 
                minLength={10} 
                maxLength={500} 
              />
            </Form.Group>
            
            {/* Disponibilidad  */}
            <Form.Group className="mb-3">
              <Form.Label>Disponibilidad</Form.Label>
              <div className="d-flex flex-wrap gap-3 mt-2">
                <Form.Check type="radio" label="Disponible" name="estado" id="estado-disponible" value="disponible" defaultChecked />
                <Form.Check type="radio" label="Ocupada" name="estado" id="estado-ocupada" value="ocupada" />
                <Form.Check type="radio" label="Reservada" name="estado" id="estado-reservada" value="reservada" />
                <Form.Check type="radio" label="Limpieza" name="estado" id="estado-limpieza" value="limpieza" />
                <Form.Check type="radio" label="Mantenimiento" name="estado" id="estado-mantenimiento" value="mantenimiento" />
              </div>
            </Form.Group>

            {/* Cargar imagen */}
            <Form.Group className="mb-4">
              <Form.Label>Foto de la Habitación</Form.Label>
              <div
                className="border rounded d-flex justify-content-center align-items-center text-center p-4"
                style={{ borderStyle: "dashed", cursor: "pointer" }}
                onClick={() => document.getElementById('file-upload').click()} // Simula el click en el input oculto
              >
                <div>
                  <p className="mb-0 fw-semibold">Click para subir o arrastrar</p>
                  <small>SVG, PNG, JPG (MAX. 800×400px)</small>
                  <Form.Control type="file" id="file-upload" className="d-none" accept=".svg,.png,.jpg,.jpeg" />
                </div>
              </div>
              <Form.Text className="text-muted">
                Se espera una URL de imagen válida para el modelo final.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Guardar Habitación
            </Button>
          </Form>
        </Col>

        {/* Columna Derecha: Habitaciones Existentes */}
        <Col md={7} className="p-4 border rounded bg-white">
          <h3 className="mb-4 fw-bold">Habitaciones Existentes</h3>
          {habitacionesEjemplo ? (
              <CardsHabitaciones habitaciones={habitacionesEjemplo} />
          ) : (
              <p className="text-muted">Cargando habitaciones o 'CardsHabitaciones' no disponible.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHabitaciones;