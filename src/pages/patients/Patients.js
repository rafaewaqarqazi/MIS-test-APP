import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import StyledIconBox from "../../components/styledComponents/StyledIconBox";
import ColorList, { boxColors } from "../../utils/colorsList";
import PlusIcon from "../../components/svg-icons/PlusIcon";
import moment from "moment";
import LocationIcon from "../../components/svg-icons/LocationIcon";
import ClockIcon from "../../components/svg-icons/ClockIcon";
import UserCircleIcon from "../../components/svg-icons/UserCircleIcon";
import EditIcon from "../../components/svg-icons/EditIcon";
import TrashIcon from "../../components/svg-icons/TrashIcon";
import ReactPaginate from "react-paginate";
import AngleDownIcon from "../../components/svg-icons/AngleDownIcon";
import { Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import PortletBody from "../../components/portlet/PortletBody";
import Portlet from "../../components/portlet/Portlet";
import PortletHeader from "../../components/portlet/PortletHeader";
import { getAllPatients, removePatient } from "../../utils/crud/patient.crud";
import CloseCircleIcon from "../../components/svg-icons/CloseCircleIcon";
import StyledInput from "../../components/styledComponents/StyledInput";
import StyledButton from "../../components/styledComponents/StyledButton";
const Patients = () => {
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [patientsList, setPatientsList] = useState([]);
  useEffect(() => {
    setLoading(true);
    getAllPatients({ perPage, page })
      .then((res) => {
        setPatientsList(res.data?.patients || []);
        setTotal(res.data?.count || 0);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ error });
      });
  }, [page, perPage]);
  const handlePerPageChange = (newPerPage) => () => {
    setPerPage(newPerPage);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleDelete = () => {
    removePatient({ id })
      .then((res) => {
        setPatientsList((prevState) => prevState.filter((p) => p.id !== id));
        setShow(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  return (
    <PortletBody withBg className="border-top-right-radius">
      <Header title="Patients" />
      <Portlet>
        <PortletHeader
          title="Patients List"
          toolbar={
            <div className="d-flex align-items-center">
              <StyledIconBox
                color={ColorList.primary}
                marginRight="0"
                as={Link}
                to="/create"
              >
                <PlusIcon size="16px" />
              </StyledIconBox>
            </div>
          }
        />
        <PortletBody>
          {loading && (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 200 }}
            >
              <div className="spinner spinner-border" />
            </div>
          )}
          {!loading && patientsList.length === 0 ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 200 }}
            >
              No Record Found!
            </div>
          ) : (
            patientsList.map((patient, i) => (
              <div
                className="d-flex align-items-center mb-3 pb-3 border-bottom"
                key={i}
              >
                <StyledIconBox
                  color={boxColors[Math.floor(Math.random() * 5)]}
                  marginRight="10px"
                >
                  {patient?.name[0]}
                </StyledIconBox>
                <div className="d-flex flex-column flex-grow-1">
                  <span className="text text-bold mb-1">{patient.name}</span>
                  <div className="d-flex align-items-center">
                    <div className="secondary-text  mr-4">
                      <span className="mr-2">(S / D) of: </span>
                      <span>{patient.father_name}</span>
                    </div>
                    <div className="secondary-text mr-4">
                      <span className="mr-2">
                        <LocationIcon size="14px" />
                      </span>
                      <span>{patient.address}</span>
                    </div>
                    <div className="secondary-text mr-4">
                      <span className="mr-2">
                        <ClockIcon size="14px" />
                      </span>
                      <span>{moment(patient.createdAt).format("LLL")}</span>
                    </div>
                    <div className="secondary-text mr-4">
                      <span className="mr-2">MrNO:</span>
                      <span>{patient.mrno}</span>
                    </div>
                    <div className="secondary-text mr-4">
                      <span className="mr-2">No of Vitals:</span>
                      <span>{patient.patient_vitals?.length || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <Link to={`/edit/${patient.mrno}`} className="text-grey">
                    <EditIcon />
                  </Link>
                  <button
                    className="text-grey"
                    onClick={() => {
                      setId(patient.id);
                      setShow(true);
                    }}
                  >
                    <TrashIcon size="18px" />
                  </button>
                </div>
              </div>
            ))
          )}
        </PortletBody>
        <PortletBody className=" pt-0 d-flex align-items-center justify-content-between">
          <ReactPaginate
            pageCount={Math.ceil(total / perPage)}
            onPageChange={handlePageChange}
            marginPagesDisplayed={2}
            containerClassName="pagination__container"
            pageLinkClassName="pagination__page"
            previousClassName="pagination__page-prev-next"
            nextClassName="pagination__page-prev-next"
            previousLabel={<AngleDownIcon left size="6px" />}
            nextLabel={<AngleDownIcon right size="6px" />}
            activeLinkClassName="pagination__page-active"
          />
          <div className="pagination__per-page">
            <Dropdown>
              <Dropdown.Toggle
                className="menu-toggle carrot-none p-2"
                style={{ borderRadius: 4 }}
              >
                <span className="d-flex align-items-center">
                  <span className="mr-3">{perPage}</span>
                  <AngleDownIcon size="8px" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="menu-dropdown shadow-lg">
                <Dropdown.Item onClick={handlePerPageChange(10)}>
                  10
                </Dropdown.Item>
                <Dropdown.Item onClick={handlePerPageChange(20)}>
                  20
                </Dropdown.Item>
                <Dropdown.Item onClick={handlePerPageChange(30)}>
                  30
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <span className="text ml-2">Showing 1-10 of 100</span>
          </div>
        </PortletBody>
      </Portlet>
      <Modal show={show} centered onHide={hideModal}>
        <Modal.Header closeButton className="border-bottom-0 pb-0" />
        <Modal.Body className="d-flex  flex-column align-items-center text-center pt-0 ">
          <PortletBody className="pt-0">
            <div className="text-red mb-4">
              <CloseCircleIcon size="100px" />
            </div>
            <h4 className="text-bold mb-4">Are you Sure?</h4>
            <h5 className="text-grey ">
              Do you really want to delete this patient?
            </h5>

            <StyledButton
              danger
              className="mx-auto mt-3 text-nowrap"
              onClick={handleDelete}
            >
              Delete Now
            </StyledButton>
          </PortletBody>
        </Modal.Body>
      </Modal>
    </PortletBody>
  );
};
export default Patients;
