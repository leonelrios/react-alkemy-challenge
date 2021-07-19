import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import { Container, Row, Col, Label } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const { setToken } = useAuth();

  const auth = (values) => {
    const consultAPI = async () => {
      const url = "http://challenge-react.alkemy.org/";
      await axios
        .post(url, {
          email: `${values.user}`,
          password: `${values.password}`,
        })
        .then(function (response) {
          setLoad(true);
          setTimeout(() => {
            setToken(response.data.token);
            history.push("/");
          }, 2000);
        })
        .catch(function (error) {
          setLoad(true);
          setTimeout(() => {
            setError(true);
            setLoad(false);
            console.log(error);
          }, 1500);
        });
    };

    consultAPI();
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 4, offset: 4 }} sm="12">
          <h1 className="text-center mt-5">SuperHeros</h1>
          <Formik
            initialValues={{ user: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.user) {
                errors.user = "Required Email";
              }

              if (!values.password) {
                errors.password = "Required Password";
              } else if (values.password.length < 3) {
                errors.password = "Length must be greater than 3";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                setError(false);
                auth(values);
              }, 400);
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form className="bg-dark p-4 text-white">
                <Label htmlFor="user" className="mt-3">
                  Email
                </Label>
                <Field className="w-100" name="user" type="email" />
                <ErrorMessage
                  className={errors.user ? "error-input" : ""}
                  name="user"
                  component="div"
                />

                <Label htmlFor="password" className="mt-3">
                  Password
                </Label>
                <Field className="w-100" name="password" type="password" />
                <ErrorMessage
                  className={errors.password ? "error-input" : ""}
                  name="password"
                  component="div"
                />
                <button
                  className="btn btn-success w-100 mt-3"
                  type="submit"
                  disabled={isSubmitting}
                >
                  SignIn
                </button>

                {error ? (
                  <Error message="The email or password is incorrect" />
                ) : null}
              </Form>
            )}
          </Formik>
          {load ? <Spinner /> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
