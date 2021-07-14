import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Modal, Spinner, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// components
import RotaCreatorComponent from "../components/RotaCreatorComponentTwo";
import AllRotasTableComponent from "../components/AllRotasTableComponent";
import HomeScreenAdminNavigation from "../components/HomeScreenAdminNavigation";

// helper methods
import { getCookie, isAuth } from "../utilities/authUtilities";

const AdminRotaCreatorScreen = () => {
  // state with useState hook
  const [rotas, setRotas] = useState([]);
  const [isFetchingRotas, setIsFetchingRotas] = useState(true);
  const [newRotaAdded, setNewRotaAdded] = useState(false);

  const [users, setUsers] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);

  const [modalData, setModalData] = useState([]);
  const [show, setShow] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [submitRemove, setSubmitRemove] = useState(false);

  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const handleClose = () => setShow(false);

  const handleShowRemoveModal = (id) => {
    setModalData(() => rotas.find((rota) => rota._id === id));
    setShowRemoveModal(true);
    setSubmitRemove(false);
    console.log(id);
  };

  // fetching users on load
  const fetchUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/users/`);
    //console.log(response);
    if (response) {
      setUsers(response.data);
      setIsFetchingUsers(false);
    } else {
      console.log("something went wrong when fetching users...");
    }
  };

  // delete rota function
  const handleDeleteRota = (e) => {
    const { _id } = modalData;
    e.preventDefault();
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/rota/${modalData._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: { _id },
    }).then((response) => {
      toast.success(`Rota has been deleted`);
      setUsers(users.filter((user) => user._id !== _id));
      setSubmitRemove(true);
    });
    //closing modal
    handleCloseRemoveModal();
  };

  // fetching rotas on load
  const fetchRotas = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/rota`);
    //console.log(response);
    if (response) {
      setRotas(response.data);
      setIsFetchingRotas(false);
    } else {
      console.log("something went wrong when fetching rota...");
    }
  };

  useEffect(() => {
    fetchUsers();

    return () => {
      setUsers([]);
      setRotas([]);
    };
  }, []);

  useEffect(() => {
    fetchRotas();
    console.log("submit Remove changed");
  }, [submitRemove, setNewRotaAdded]);

  return (
    <>
      {isAuth() && isAuth().role === "admin" && (
        <Row>
          <Col>
            <HomeScreenAdminNavigation />
          </Col>
        </Row>
      )}
      <Row>
        <ToastContainer />
        <Col>
          <h1 className="text-center my-3">Staff Rota Management</h1>
        </Col>
      </Row>
      <Row>
        <h2 className="text-center my-3">All Rotas</h2>
        {isFetchingRotas ? (
          <Spinner />
        ) : (
          <AllRotasTableComponent
            rotas={rotas}
            handleShowRemoveModal={handleShowRemoveModal}
          />
        )}
      </Row>
      <Row>
        <h2 className="text-center my-3">Rota Creator</h2>
      </Row>
      {isFetchingUsers ? (
        <Spinner />
      ) : (
        <Row>
          <RotaCreatorComponent
            users={users}
            setNewRottaAdded={setNewRotaAdded}
          />
        </Row>
      )}
      {/* Remove Rota Modal */}
      <Modal show={showRemoveModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleDeleteRota}>
          <Modal.Body>
            <h3>
              Rota removal for week starting{" "}
              <span className="text-danger">{modalData.weekStart}</span>
            </h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleCloseRemoveModal}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AdminRotaCreatorScreen;
