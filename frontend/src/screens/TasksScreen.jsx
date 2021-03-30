import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Container,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { setPriorityColour } from "../utilities/stylingUtilities";
import { isAuth, getCookie } from "../utilities/authUtilities";
import { formatDistance, subDays, format } from "date-fns";

const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [show, setShow] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [closeRemove, setCloseRemove] = useState(false);
  const [submitRemove, setSubmitRemove] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskPriority, setTaskPriority] = useState("select");
  const [isTaskUpdated, setIsTaskUpdated] = useState(false);

  const handleClose = () => setShow(false);

  const handleCloseRemove = () => setShowRemove(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleModalSubmitRemove = (e) => {
    const { _id } = modalData;
    e.preventDefault();
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/tasks/${modalData._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: { _id },
    }).then((response) => {
      console.log("item removed");
      toast.success(`Task has been deleted`);
      setTasks(tasks.filter((task) => task._id !== _id));
      setSubmitRemove(true);
    });

    //closing modal
    handleCloseRemove();
  };

  const handleShowRemove = (id) => {
    console.log(id);
    setModalData(() => tasks.find((task) => task._id === id));
    setShowRemove(true);
  };

  const handleTaskCompleted = (e) => {
    e.preventDefault();

    const { _id, completed, priority } = modalData;
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API}/tasks/finished/${_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: { completed, priority },
    }).then((response) => {
      toast.success(`Task has been completed!`);
      setIsCompleted(true);
    });
  };

  // Update Task Modal Handlers
  // handling Tasks form changes
  const handleTaskInputChange = (name) => (event) => {
    console.log(event.target.value);
    // getting existing state and update the key with same name as function argument
    setModalData({ ...modalData, [name]: event.target.value });
    console.log(modalData);
  };

  const changePriority = (event) => {
    setTaskPriority(event.target.value);
    setModalData({ ...modalData, priority: event.target.value });
  };

  const changeAssignedTo = (event) => {
    setModalData({ ...modalData, assignedTo: event.target.value });
  };

  // submitting edited task
  const handleEditTaskSubmit = (e) => {
    e.preventDefault();
    const { _id, taskName, assignedTo, priority } = modalData;
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API}/tasks/admin/${_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: { taskName, priority, assignedTo },
    }).then((response) => {
      toast.success(`Task has been updated`);
      setIsTaskUpdated(true);
      handleCloseEditModal();
    });
  };

  const handleShowEditModal = (id) => {
    setModalData(() => tasks.find((task) => task._id === id));
    setShowEditModal(true);
    setIsTaskUpdated(false);
  };

  // fetching tasks on load
  const fetchTasks = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/tasks`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    setTasks(data);
    setIsCompleted(false);
  };

  // fetching users on load
  const fetchUsers = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/users/names`
    );
    //console.log(response);
    if (response) {
      setUsers(response.data);
    } else {
      console.log("something went wrong when fetching users...");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
    return () => {
      setUsers([]);
      setTasks([]);
    };
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [isCompleted, isTaskUpdated]);

  return (
    <Container>
      <Row>
        <Col>
          <ToastContainer />
          <h1>Jobs to-do List</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered hover size="sm">
            <thead className="bg-dark text-light">
              <tr>
                <th>Job to do</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Date / Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className={task.completed ? "table-success" : null}>
                    {task.taskName}
                  </td>
                  <td className={task.completed ? "table-success" : null}>
                    {task.assignedTo.name.split(" ")[0]}
                  </td>
                  <td
                    className={`table-${setPriorityColour(
                      task.priority
                    )} text-center`}
                  >
                    {task.priority}
                  </td>
                  <td className={task.completed ? "table-success" : null}>
                    {task.createdAt.split("T")[0]}
                    <span className="text-danger"> | </span>
                    {task.createdAt.split("T")[1].split(".")[0]}
                  </td>
                  {isAuth() ? (
                    <td className="d-flex">
                      <Form inline={true} onSubmit={handleTaskCompleted}>
                        <Button
                          disabled={task.completed ? true : false}
                          className="mx-1"
                          variant="success"
                          size="sm"
                          onClick={() => {
                            setModalData({
                              ...modalData,
                              _id: task._id,
                              priority: "done",
                              completed: true,
                            });
                          }}
                          type="submit"
                        >
                          <i className="fas fa-check"></i>
                        </Button>
                      </Form>

                      <Button
                        className="mx-1"
                        disabled={task.completed ? true : false}
                        variant="warning"
                        size="sm"
                        onClick={() => handleShowEditModal(task._id)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      {isAuth() && isAuth().role === "admin" ? (
                        <Button
                          /* disabled={task.completed ? false : true} */
                          className="mx-1"
                          variant="danger"
                          size="sm"
                          onClick={() => handleShowRemove(task._id)}
                        >
                          <i className="fas fa-minus"></i>
                        </Button>
                      ) : null}
                    </td>
                  ) : (
                    <td>
                      <p className="text-danger text-small">
                        <small>Please login to see actions</small>
                      </p>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {/* Remove Product Modal */}
      <Modal show={showRemove} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleModalSubmitRemove}>
          <Modal.Body>
            <h3>
              Remove of <span className="text-danger">completed task</span>
            </h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleCloseRemove}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Remove
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* Edit Task Privileges */}
      <Modal show={showEditModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditTaskSubmit}>
          <Modal.Body>
            <h3>
              Task : <span className="text-danger">{modalData.taskName}</span>
            </h3>
            <Form.Group controlId="Name">
              <Form.Label>Job to do</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task Name"
                onChange={handleTaskInputChange("taskName")}
                value={modalData.taskName}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>

              <Form.Control
                as="select"
                onChange={changePriority}
                value={modalData.priority}
                className={`bg-${setPriorityColour(
                  modalData.priority
                )} text-light`}
              >
                <option className="bg-info" value="low">
                  Low
                </option>
                <option className="bg-warning" value="medium">
                  Medium
                </option>
                <option className="bg-danger" value="high">
                  High
                </option>
              </Form.Control>
            </Form.Group>
            {users.length !== 0 ? (
              <Form.Group controlId="assignedTo">
                <Form.Label>Assign Task to:</Form.Label>
                <Form.Control as="select" onChange={changeAssignedTo}>
                  {users.length !== 0 ? (
                    users.map((user) => (
                      <option
                        selected={modalData.assignedTo}
                        key={user._id}
                        value={user._id}
                      >
                        {user.name}
                      </option>
                    ))
                  ) : (
                    <option className="bg-danger text-light">
                      Error fetching users
                    </option>
                  )}
                </Form.Control>
              </Form.Group>
            ) : (
              <Spinner />
            )}
            {/*   */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="warning" type="submit">
              Update Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default TasksScreen;
