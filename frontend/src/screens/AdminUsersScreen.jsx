import React, { useState, useEffect } from "react";
import { Row, Col, Table, Spinner, Button, Form, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getCookie } from "../utilities/authUtilities";

const AdminUsersScreen = () => {
  // state with useState hook
  const [users, setUsers] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);
  // Modal for removing user confirmation
  const [modalData, setModalData] = useState([]);
  const [show, setShow] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [submitRemove, setSubmitRemove] = useState(false);
  const [submitEditRole, setSubmitEditRole] = useState(false);

  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleClose = () => setShow(false);

  const handleShowRemoveModal = (id) => {
    setModalData(() => users.find((user) => user._id === id));
    setShowRemoveModal(true);
    setSubmitRemove(false);
    console.log(id);
  };
  const handleShowEditModal = (id) => {
    setModalData(() => users.find((user) => user._id === id));
    setShowEditModal(true);
    setSubmitEditRole(false);
    console.log(id);
  };

  // delete user function
  const handleDeleteUser = (e) => {
    const { _id, name } = modalData;
    e.preventDefault();
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/users/${modalData._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: { _id },
    }).then((response) => {
      toast.success(`User ${name} has been deleted`);
      setUsers(users.filter((user) => user._id !== _id));
      setSubmitRemove(true);
    });

    //closing modal
    handleCloseRemoveModal();
    console.log(`user: ${_id} has been deleted`);
  };

  // edit user role form submit
  const handleEditUserRoleSubmit = (e) => {
    e.preventDefault();
    console.log("role changed");
    const { _id, role } = modalData;
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API}/users/admin/${_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: { role },
    }).then((response) => {
      toast.success(`User Role has been updated`);
      setSubmitEditRole(true);
      handleCloseEditModal();
    });
  };

  // edit user role change handler
  const handleEditRoleChange = (event) => {
    const value = event.target.value;
    // getting existing state and update the key with same name as function argument
    setModalData({ ...modalData, role: value });
    console.log(modalData);
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

  useEffect(() => {
    fetchUsers();
    return () => {
      setUsers([]);
    };
  }, []);

  useEffect(() => {
    fetchUsers();
    return () => {
      setUsers([]);
    };
  }, [submitRemove, submitEditRole]);

  return (
    <>
      <Row>
        <ToastContainer />
        <Col>
          <h1 className="text-center my-3">Users Management</h1>
        </Col>
      </Row>
      <Row>
        {isFetchingUsers ? (
          <Spinner />
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Added</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.createdAt}</td>
                  <td className="text-center">
                    {user.role === "admin" ? (
                      <i className="fas fa-check text-success"></i>
                    ) : (
                      <i className="fas fa-times text-danger"></i>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={() => handleShowEditModal(user._id)}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleShowRemoveModal(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
      {/* Remove User Modal */}
      <Modal show={showRemoveModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleDeleteUser}>
          <Modal.Body>
            <h3>
              Account delete for{" "}
              <span className="text-danger">{modalData.name}</span>
            </h3>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder={modalData.email}
                name={modalData.email}
                readOnly
              />
            </Form.Group>
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
      {/* Edit User Privileges */}
      <Modal show={showEditModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditUserRoleSubmit}>
          <Modal.Body>
            <h3>
              Privileges change for user:{" "}
              <span className="text-danger">{modalData.name}</span>
            </h3>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder={modalData.email}
                name={modalData.email}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="radio"
                label="user"
                name="userRoleRadio"
                id="formHorizontalRadios1"
                value="user"
                onChange={handleEditRoleChange}
                checked={modalData.role === "user"}
              />
              <Form.Check
                type="radio"
                label="admin"
                value="admin"
                name="userRoleRadio"
                id="formHorizontalRadios2"
                onChange={handleEditRoleChange}
                checked={modalData.role === "admin"}
              />
            </Form.Group>
            {JSON.stringify(modalData)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Change Role
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AdminUsersScreen;
