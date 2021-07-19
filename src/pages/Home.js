import React from "react";
import ListHome from "../components/ListHome";
import StatsHome from "../components/StatsHome";
import { Container, Row, Col } from "reactstrap";
import useTeam from "../hooks/useTeam";

const Home = () => {
  const { team } = useTeam();

  return (
    <Container fluid>
      <Row>
        {team.length === 0 ? (
          <h3 className="text-center mt-5">
            The team is empty, add new superheros
          </h3>
        ) : (
          <h3 className="text-center mt-5">My team</h3>
        )}
        <Col md="12">
          <div className="d-flex flex-row flex-wrap justify-content-center">
            {team.map((superhero) => (
              <ListHome key={superhero.id} superhero={superhero} />
            ))}
          </div>
        </Col>
        <Col>{team.length !== 0 ? <StatsHome /> : null}</Col>
      </Row>
    </Container>
  );
};

export default Home;
