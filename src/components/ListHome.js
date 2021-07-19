import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle, Button, Col } from "reactstrap";
import useTeam from "../hooks/useTeam";

const ListHome = ({ superhero }) => {
  const { name, image } = superhero;
  const { deleteHero } = useTeam();

  const handleDelete = () => {
    deleteHero(superhero);
  };

  return (
    <Col md="2" sm="12">
      <Card body className="bg-dark text-white p-3 m-3">
        <CardTitle tag="h5" className="text-center">
          {name}
        </CardTitle>
        <CardImg src={image.url} alt="Card image cap" />
        <Button onClick={handleDelete} className="btn btn-danger w-100 mt-3">
          Delete
        </Button>
        <Link
          to={`/superhero/` + superhero.id}
          className="btn btn-success w-100 mt-3"
        >
          Stats
        </Link>
      </Card>
    </Col>
  );
};

export default ListHome;
