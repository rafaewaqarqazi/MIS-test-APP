import React, { useState } from "react";
import StyledInput from "../components/styledComponents/StyledInput";
import { Form, Formik } from "formik";
import StyledButton from "../components/styledComponents/StyledButton";
import Portlet from "../components/portlet/Portlet";
import PortletHeader from "../components/portlet/PortletHeader";
import PortletBody from "../components/portlet/PortletBody";
import FormikInputField from "../components/FormikComponents/FormikInputField";
import { Link, useHistory } from "react-router-dom";
import { userSignUp } from "../utils/crud/auth.crud";
import { Alert } from "react-bootstrap";
const SignUp = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });
  return (
    <div
      className="portlet__body-bg border-top-right-radius"
      style={{ height: "100vh" }}
    >
      <div className="row ">
        <div className="col-4 mx-auto  mt-5">
          <Portlet>
            <PortletHeader title="User Sign Up" />
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "Required!";
                }
                if (!values.email) {
                  errors.email = "Required!";
                }
                if (!values.password) {
                  errors.password = "Required!";
                }
                if (values.password?.length < 8) {
                  errors.password = "Password Must be at least 8 characters!";
                }
                return errors;
              }}
              onSubmit={(values) => {
                setLoading(true);
                userSignUp({ user: values })
                  .then(() => {
                    setTimeout(() => {
                      setLoading(false);
                      history.push("/signIn");
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
                    <div className=" form-group">
                      <FormikInputField
                        placeholder="Name*"
                        required
                        name="name"
                        className="w-100"
                      />
                    </div>
                    <div className=" form-group">
                      <FormikInputField
                        placeholder="Email*"
                        required
                        name="email"
                        className="w-100"
                        type="email"
                      />
                    </div>
                    <div className=" form-group">
                      <FormikInputField
                        placeholder="Password*"
                        required
                        name="password"
                        className="w-100"
                        type="password"
                      />
                    </div>
                    <div className="text">
                      Already have an account?{" "}
                      <Link to="/signIn" className="text-blue">
                        SignIn
                      </Link>
                    </div>
                  </PortletBody>

                  <PortletBody className="d-flex pt-0 align-items-center justify-content-end">
                    <StyledButton
                      type="submit"
                      loading={loading}
                      disabled={loading}
                    >
                      Sign Up
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
export default SignUp;
