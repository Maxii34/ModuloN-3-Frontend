import React from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

function ReservaHabitacion() {
  return (
    <Container className="py-5" style={{ maxWidth: '650px' }}>
      {/* El estilo maxWidth centra y limita el ancho para una mejor lectura en vertical */}
      
      {/* Título de la Página Minimalista */}
      <h1 className="mb-1 fw-bold text-center">Checkout de Reserva</h1>
      <p className="text-secondary text-center mb-5">
        Completa tu información para asegurar tu Suite Deluxe.
      </p>

      {/* === SECCIÓN 1: Formulario de Datos (Arriba) === */}
      <div className="p-4 mb-4 bg-light rounded">
        <h3 className="mb-3 border-bottom pb-2">1. Tu Contacto</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-normal text-muted">Nombre Completo</Form.Label>
            <Form.Control type="text" placeholder="Tu Nombre" className="p-2" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-normal text-muted">Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="ejemplo@correo.com" className="p-2" />
          </Form.Group>
          <Form.Group controlId="formTelefono" className="mb-4">
            <Form.Label className="fw-normal text-muted">Teléfono</Form.Label>
            <Form.Control type="tel" placeholder="+XX XXX XXX XXXX" className="p-2" />
          </Form.Group>
        </Form>
        
        <h3 className="mb-4 border-bottom pb-2 mt-5">2. Información de Pago</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formCardNumber">
            <Form.Label className="fw-normal text-muted">Número de Tarjeta</Form.Label>
            <Form.Control type="text" placeholder="XXXX XXXX XXXX XXXX" className="p-2" />
          </Form.Group>
          <div className="d-flex justify-content-between gap-3">
            <Form.Group controlId="formVencimiento" className="flex-grow-1">
              <Form.Label className="fw-normal text-muted">Vencimiento (MM/AA)</Form.Label>
              <Form.Control type="text" placeholder="01/26" className="p-2" />
            </Form.Group>
            <Form.Group controlId="formCVC" className="flex-grow-1">
              <Form.Label className="fw-normal text-muted">CVC/CVV</Form.Label>
              <Form.Control type="text" placeholder="123" className="p-2" />
            </Form.Group>
          </div>
        </Form>
      </div> {/* Fin Sección 1 */}

      {/* Separador visual */}
      <hr className="my-5" />

      {/* === SECCIÓN 2: Resumen del Pedido (Abajo) === */}
      <div className="p-4 rounded bg-white border">
        
        {/* Imagen de Producto */}
        <div className="mb-4 border-bottom pb-3">
            <div className="w-100 mb-2 rounded overflow-hidden" style={{ maxHeight: '100px' }}>
                <img 
                  src="https://images.pexels.com/photos/34983175/pexels-photo-34983175.jpeg" 
                  alt="Suite Deluxe vista al mar" 
                  className='w-100 h-100' 
                  style={{ objectFit: 'cover' }} 
                />
            </div>
            <h5 className="fw-bold mt-2">Suite Deluxe (4 Noches)</h5>
        </div> 

        <h4 className="mb-3">Desglose de Costos</h4>
        
        {/* Lista de Costos */}
        <ListGroup variant="flush" className="mb-4">
          <ListGroup.Item className="d-flex justify-content-between bg-white border-0 py-2">
            <span className="text-secondary">Alojamiento (Base)</span>
            <span>$1,000.00</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between bg-white border-0 py-2">
            <span className="text-secondary">Impuestos y Tasas</span>
            <span>$120.00</span>
          </ListGroup.Item>
        </ListGroup>
        
        {/* Sección Final de TOTAL y Botón */}
        <div className="pt-3 border-top mt-4"> 
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="h5 fw-bold text-dark">TOTAL FINAL:</span>
                <span className="h4 fw-bold text-primary">$1,120.00</span>
            </div>
            
            <Button variant="primary" size="lg" className="w-100 fw-bold">
                PAGAR Y RESERVAR
            </Button>
        </div> 
      </div> {/* Fin Sección 2 */}
    </Container>
  );
}

export default ReservaHabitacion;