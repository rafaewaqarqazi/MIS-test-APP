import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import Portlet from "../../components/portlet/Portlet";
import PortletHeader from "../../components/portlet/PortletHeader";
import PortletBody from "../../components/portlet/PortletBody";
import FormikInputField from "../../components/FormikComponents/FormikInputField";
import StyledButton from "../../components/styledComponents/StyledButton";
import Header from "../../components/header/Header";
import {
  createPatient,
  getPatientById,
  updatePatient,
} from "../../utils/crud/patient.crud";
import { Alert } from "react-bootstrap";
const NewPatient = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [error, setError] = useState({ show: false, message: "" });
  const params = useParams();
  console.log({ params });
  useEffect(() => {
    if (params.id)
      getPatientById({ id: params.id })
        .then((res) => {
          setData(res.data.patient);
        })
        .catch((error) => {
          console.log({ error: error.message });
        });
  }, [params.id]);
  const [loading, setLoading] = useState(false);
  return (
    <PortletBody withBg className="border-top-right-radius">
      <Header title="New Patient" />
      <div className="row ">
        <div className="col-4 mx-auto  mt-5">
          <Portlet>
            <PortletHeader title="Create New Patient" />
            <Formik
              initialValues={
                data || {
                  mrno: "",
                  name: "",
                  father_name: "",
                  email: "",
                  dob: "",
                  address: "",
                }
              }
              enableReinitialize
              validate={(values) => {
                const errors = {};
                if (!values.mrno) {
                  errors.mrno = "Required!";
                }
                if (!values.name) {
                  errors.name = "Required!";
                }
                if (!values.father_name) {
                  errors.father_name = "Required!";
                }
                if (!values.email) {
                  errors.email = "Required!";
                }
                if (!values.dob) {
                  errors.dob = "Required!";
                }
                if (!values.address) {
                  errors.address = "Required!";
                }
                return errors;
              }}
              onSubmit={(values) => {
                setLoading(true);
                const call = data ? updatePatient : createPatient;
                call({ patient: values })
                  .then(() => {
                    setTimeout(() => {
                      setLoading(false);
                      history.push("/");
                    }, 500);
                  })
                  .catch((error) => {
                    setLoading(false);
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
                        placeholder="MrNo*"
                        required
                        name="mrno"
                        type="number"
                        className="w-100"
                      />
                    </div>
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
                        placeholder="Father Name*"
                        required
                        name="father_name"
                        className="w-100"
                      />
                    </div>
                    {data && (
                      <>
                        <div className=" form-group">
                          <FormikInputField
                            placeholder="Weight*"
                            name="weight"
                            type="number"
                            className="w-100"
                          />
                        </div>
                        <div className=" form-group">
                          <FormikInputField
                            placeholder="Height*"
                            name="height"
                            type="number"
                            className="w-100"
                          />
                        </div>
                        <div className=" form-group">
                          <FormikInputField
                            placeholder="Temperature*"
                            name="temperature"
                            type="number"
                            className="w-100"
                          />
                        </div>
                      </>
                    )}
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
                        placeholder="Address*"
                        required
                        name="address"
                        className="w-100"
                      />
                    </div>
                    <div className=" form-group">
                      <FormikInputField
                        placeholder="DOB*"
                        required
                        name="dob"
                        className="w-100"
                        type="date"
                      />
                    </div>
                  </PortletBody>

                  <PortletBody className="d-flex pt-0 align-items-center justify-content-end">
                    <StyledButton
                      type="submit"
                      loading={loading}
                      disabled={loading}
                    >
                      {data ? "Update" : "Create"} Patient
                    </StyledButton>
                  </PortletBody>
                </Form>
              )}
            </Formik>
          </Portlet>
        </div>
      </div>
    </PortletBody>
  );
};
export default NewPatient;
