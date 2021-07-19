import React from "react";
import { Card, CardImg, CardTitle, Button, Col } from "reactstrap";
import useTeam from "../hooks/useTeam";

const ListSearched = ({ superhero }) => {
  const { name, image } = superhero;

  const { insertHero } = useTeam();

  const handleClick = () => {
    insertHero(superhero);
  };

  return (
    <Col md="3" sm="12">
      <Card body className="bg-dark text-white p-3 m-3">
        <CardTitle tag="h5" className="text-center">
          {name}
        </CardTitle>
        <CardImg src={image.url} alt="Card image cap" />
        <Button onClick={handleClick} className="btn btn-success mt-3">
          Recruit
        </Button>
      </Card>
    </Col>
  );
};

export default ListSearched;
