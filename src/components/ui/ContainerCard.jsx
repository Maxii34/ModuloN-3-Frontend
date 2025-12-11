import { Col, Container, Row } from "react-bootstrap";
import { CardsNosotros } from "./CardsNosotros";

export const ContainerCard = () => {
    const nosotros = [
  {
    id: 1,
    nombre: "Maximiliano Ordoñez",
    imagen: "",
    github: "",
    linkedin: ""
  },
  {
    id: 2,
    nombre: "",
    imagen: "",
    github: "",
    linkedin: ""
  },
  {
    id: 3,
    nombre: "",
    imagen: "",
    github: "",
    linkedin: ""
  },
  {
    id: 4, 
    nombre: "",
    imagen: "",
    github: "",
    linkedin: ""
  }
];

  return (
    <>
      <Container className="mt-5">
        <Row className="d-flex justify-content-center align-content-center">
            {nosotros.map((nts, index) =>
          <Col xs={12} sm={12} md={4} lg={3} key={index} className="p-0 m-0">
            <CardsNosotros nts={nts}  />
          </Col>
            )}
        </Row>
      </Container>
    </>
  );
};
