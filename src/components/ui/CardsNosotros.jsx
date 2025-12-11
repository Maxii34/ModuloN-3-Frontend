import { Card, Button } from "react-bootstrap";
import "./Modales.css";

export const CardsNosotros = ({ nts }) => {
  return (
    <>
      <Card style={{ width: "15rem" }}>
        <Card.Img
          variant="top"
          src=""
          className="rounded-circle card-img-circle "
          loading="lazy"
        />
        <Card.Body>
          <Card.Title>{nts.nombre}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};
