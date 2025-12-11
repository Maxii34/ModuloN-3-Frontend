import { Container, Row, Col, Card } from "react-bootstrap";

export const QuienesSomos = () => {
  return (
    <>
      <section className="mt-4 mb-4 css-quienes-somos">
        <Container>
          <Card>
            <Row className="g-0">
              <Col md={6}>
                <Card.Img
                  variant="top"
                  src="https://images.pexels.com/photos/33389199/pexels-photo-33389199.jpeg"
                  alt="Imagen de la tarjeta"
                  style={{ height: "350px", objectFit: "cover" }}
                />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>
                    {" "}
                    <strong>Sintax Hotel</strong>{" "}
                  </Card.Title>
                  <Card.Text>
                    Bienvenido a Sintax Hotel, el punto de encuentro perfecto
                    entre la tecnología de vanguardia y la calidez de nuestro
                    servicio. Hemos estructurado una experiencia de alojamiento
                    inigualable, donde cada detalle está diseñado para ofrecerte
                    el máximo confort y una estancia impecable. Descubre nuestro
                    diseño inteligente y nuestra hospitalidad de primer nivel,
                    ideal para viajes de negocios o placer.
                  </Card.Text>
                  <div
                    style={{
                      marginTop: "20px",
                      borderLeft: "4px solid #007bff",
                      paddingLeft: "15px",
                      fontStyle: "italic",
                      color: "#555",
                    }}
                  >
                    <h5 className="mb-1 text-primary">
                      Nuestra Promesa Sintax
                    </h5>
                    <p className="mb-0">
                      "Eficiencia en cada proceso. Confort en cada rincón. El
                      diseño funcional de Sintax garantiza tu tranquilidad."
                    </p>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      </section>
    </>
  );
};
