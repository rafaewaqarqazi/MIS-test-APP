import React, { useState } from "react";
import { Form, Formik } from "formik";
import StyledButton from "../components/styledComponents/StyledButton";
import Portlet from "../components/portlet/Portlet";
import PortletHeader from "../components/portlet/PortletHeader";
import PortletBody from "../components/portlet/PortletBody";
import FormikInputField from "../components/FormikComponents/FormikInputField";
import { signIn } from "../utils/crud/auth.crud";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
const SignIn = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });
  return (
    <div
      className="portlet__body-bg border-top-right-radius "
      style={{ height: "100vh" }}
    >
      <div className="row ">
        <div className="col-4 mx-auto mt-5">
          <Portlet>
            <PortletHeader title="Sign In to Your Account" />
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required!";
                }
                if (!values.password) {
                  errors.password = "Required!";
                }
                return errors;
              }}
              onSubmit={(values) => {
                setLoading(true);
                signIn(values)
                  .then((res) => {
                    setTimeout(() => {
                      setLoading(false);
                      localStorage.setItem(
                        "token",
                        JSON.stringify(res.data.token)
                      );
                      localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.user)
                      );
                      history.push("/");
                    }, 500);
                  })
                  .catch((error) => {
                    setLoading(false);
                    console.log({ error: error.message });
                    setError({
                      show: true,
                      message:
                        error?.response?.data?.error || "Something went wrong!",
                    });
                  });
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <PortletBody className="py-0">
                    <Alert
                      show={error.show}
                      onClose={() => setError({ show: false, message: "" })}
                      variant="danger"
                      dismissible
                    >
                      {error.message}
                    </Alert>
                    <div className="form-group">
                      <FormikInputField
                        placeholder="Email *"
                        required
                        name="email"
                        type="email"
                        className=" w-100"
                      />
                    </div>
                    <div className="form-group">
                      <FormikInputField
                        placeholder="Password *"
                        required
                        name="password"
                        className=" w-100"
                        type="password"
                      />
                    </div>
                    <div className="text">
                      Don't have an account?{" "}
                      <Link to="/signUp" className="text-blue">
                        SignUp
                      </Link>
                    </div>
                  </PortletBody>
                  <PortletBody className="d-flex pt-0 align-items-center justify-content-end">
                    <StyledButton
                      type="submit"
                      disabled={loading}
                      loading={loading}
                    >
                      Login
                    </StyledButton>
                  </PortletBody>
                </Form>
              )}
            </Formik>
          </Portlet>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
