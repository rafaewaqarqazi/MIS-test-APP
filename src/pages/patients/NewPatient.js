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
  createVital,
  getPatientById,
  updatePatient,
} from "../../utils/crud/patient.crud";
import { Alert, Table } from "react-bootstrap";
import FormikDropdown from "../../components/FormikComponents/FormikDropdown";
import moment from "moment";
const NewPatient = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [error, setError] = useState({ show: false, message: "" });
  const params = useParams();
  console.log({ params });
  useEffect(() => {
    if (params.id) getData();
  }, [params.id]);
  const getData = () => {
    getPatientById({ id: params.id })
      .then((res) => {
        setData(res.data.patient);
      })
      .catch((error) => {
        console.log({ error: error.message });
      });
  };
  const [loading, setLoading] = useState({ data: false, vital: false });
  const enableLoading = (name) => {
    setLoading((prevState) => ({ ...prevState, [name]: true }));
  };
  const disableLoading = (name) => {
    setLoading((prevState) => ({ ...prevState, [name]: false }));
  };
  const vitals = [
    {
      value: 1,
      title: "Weight",
    },
    {
      value: 2,
      title: "Height",
    },
    {
      value: 3,
      title: "Temperature",
    },
  ];
  return (
    <PortletBody withBg className="border-top-right-radius">
      <Header title="New Patient" />
      <div className="row ">
        <div className="col-4 offset-4  mt-5">
          <Portlet>
            <PortletHeader
              title={data ? "Update Patient" : "Create New Patient"}
            />
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
                enableLoading("data");
                const call = data ? updatePatient : createPatient;
                call({ patient: values })
                  .then(() => {
                    setTimeout(() => {
                      setLoading(false);
                      history.push("/");
                    }, 500);
                  })
                  .catch((error) => {
                    disableLoading("data");
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
                      loading={loading.data}
                      disabled={loading.data}
                    >
                      {data ? "Update" : "Create"} Patient
                    </StyledButton>
                  </PortletBody>
                </Form>
              )}
            </Formik>
          </Portlet>
        </div>
        {data && (
          <div className="col-4   mt-5">
            <Portlet>
              <PortletHeader title="Patient's Vitals" />
              <Formik
                initialValues={{
                  vital_id: "",
                  value: "",
                }}
                enableReinitialize
                validate={(values) => {
                  const errors = {};

                  if (!values.vital_id) {
                    errors.vital_id = "Required!";
                  }
                  if (!values.value) {
                    errors.value = "Required!";
                  }
                  return errors;
                }}
                onSubmit={(values) => {
                  enableLoading("vital");
                  console.log({ values, data });
                  createVital({ ...values, mrno: data.mrno })
                    .then(() => {
                      setTimeout(() => {
                        disableLoading("vital");
                        getData();
                      }, 500);
                    })
                    .catch((error) => {
                      disableLoading("vital");
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
                        <FormikDropdown name="vital_id" options={vitals} />
                      </div>
                      <div className=" form-group">
                        <FormikInputField
                          placeholder="Value*"
                          required
                          name="value"
                          className="w-100"
                          type="number"
                        />
                      </div>
                    </PortletBody>

                    <PortletBody className="d-flex pt-0 align-items-center justify-content-end">
                      <StyledButton
                        type="submit"
                        loading={loading.vital}
                        disabled={loading.vital}
                      >
                        Create Vital
                      </StyledButton>
                    </PortletBody>
                  </Form>
                )}
              </Formik>
              <PortletBody>
                <Table responsive striped borderless>
                  <thead>
                    <th className="text">Id</th>
                    <th className="text">MrNo</th>
                    <th className="text">Vital</th>
                    <th className="text">Value</th>
                    <th className="text">Created At</th>
                  </thead>
                  <tbody>
                    {data?.patient_vitals?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className={"text-center secondary-text"}
                        >
                          No Record Found!
                        </td>
                      </tr>
                    ) : (
                      data?.patient_vitals.map((vital, i) => (
                        <tr key={i}>
                          <td className="text">{vital.id}</td>
                          <td className="text">{vital.mrno}</td>
                          <td className="text">
                            {" "}
                            {
                              vitals.filter(
                                (v) => v.value === vital.vital_id
                              )[0].title
                            }
                          </td>
                          <td className="text">{vital.value}</td>
                          <td className="text">
                            {moment(vital.createdAt).fromNow()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </PortletBody>
            </Portlet>
          </div>
        )}
      </div>
    </PortletBody>
  );
};
export default NewPatient;
