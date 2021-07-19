import React, { useState } from "react";
import axios from "axios";
import ListSearched from "../components/ListSearched";
import useTeam from "../hooks/useTeam";
import { Container, Row, Col, Label } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Search = () => {
  const [superheros, setSuperheros] = useState([]);
  const [consult, setConsult] = useState(false);
  const [error, setError] = useState(false);

  const { teamFull } = useTeam();

  const searchSuperhero = (values) => {
    const consultAPI = async () => {
      const url = `https://www.superheroapi.com/api.php/4407254809293739/search/${values.superhero}`;
      await axios
        .get(url)
        .then((response) => {
          if (response.data.error) {
            setError(true);
            setConsult(false);
            return null;
          }
          setSuperheros(response.data.results);
          setConsult(true);
          setError(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    consultAPI();
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 4, offset: 4 }} sm="12">
          <Formik
            initialValues={{ superhero: "" }}
            validate={(values) => {
              const errors = {};

              if (!values.superhero) {
                errors.superhero = "Required Superhero";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              searchSuperhero(values);
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form className="bg-dark text-white p-4 mt-5">
                <Label htmlFor="superhero">Superhero</Label>
                <Field className="w-100" name="superhero" type="text" />
                <ErrorMessage
                  className={errors.superhero ? "error-input" : ""}
                  name="superhero"
                  component="div"
                />
                <button
                  className="btn btn-success w-100 mt-3"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Search
                </button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Row>
        <Col md="12" sm="12">
          {teamFull ? (
            <p className="error-search w-25 mx-auto mt-2">Team Full</p>
          ) : null}
          {consult ? <h2 className="text-center mt-5">Superheros</h2> : null}
          <div className="d-flex flex-row flex-wrap justify-content-center">
            {error ? (
              <p className="error-search w-25 mx-auto mt-2">
                Superhero not found
              </p>
            ) : (
              superheros.map((superhero) => (
                <ListSearched key={superhero.id} superhero={superhero} />
              ))
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
