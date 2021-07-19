import React from "react";
import useTeam from "../hooks/useTeam";
import { useParams } from "react-router";
import { Col, Container, Row } from "reactstrap";

const Superhero = () => {
  const { team } = useTeam();
  const id = useParams();
  const superhero = team.filter((hero) => hero.id === id.id);
  const { name, appearance, biography, work, image } = superhero[0];

  return (
    <Container>
      <Row className="mt-5">
        <Col sm="12" md="6">
          <img
            src={image.url}
            alt={name}
            className="border border-success border-4 w-100 superhero-image"
          />
        </Col>
        <Col sm="12" md="6">
          <div className="w-100 bg-dark text-white text-center border border-dark border-2 superhero-div">
            <h3 className="pt-4 bg-white pb-4 text-success">{name}</h3>
            <p className="mt-5">
              <span>Height: </span>
              {appearance.height[1]}
            </p>
            <p>
              <span>Weight: </span>
              {appearance.weight[1]}
            </p>
            <p>
              <span>Aliases: </span>
            </p>
            {biography.aliases.map((alias, i) => {
              return (
                <p key={i} className="aliases">
                  {alias}
                </p>
              );
            })}
            <p>
              <span>Eye color: </span>
              {appearance["eye-color"]}
            </p>
            <p>
              <span>Hair color: </span>
              {appearance["hair-color"]}
            </p>
            <p>
              <span>Occupation: </span>
              {work.occupation}
            </p>
            <p className="pb-4">
              <span>Base: </span>
              {work.base}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Superhero;
