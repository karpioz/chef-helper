import React, { useState, useEffect } from "react";
import { Row, Col, Table, Container, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { isAuth } from "../utilities/authUtilities";
import { format } from "morgan";
import { formatDistance, subDays } from "date-fns";

const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Task actions
  const handleTaskRemove = (e, id) => {
    //
  };

  const handleTaskCompleted = () => {
    //
    setIsCompleted(!isCompleted);
  };

  // Priority Colour Styles
  const setPriorityColour = (level) => {
    let colour;
    switch (level) {
      case "low":
        colour = "success";
        break;
      case "medium":
        colour = "warning";
        break;
      default:
        colour = "danger";
    }
    return colour;
  };

  // Completed Task Table Row style
  const setCompletedTaskTableColour = () => {
    return "table-success";
  };

  // fetching tasks on load
  const fetchTasks = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/tasks`);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <ToastContainer />
          <h1>Tasks</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead className="bg-dark text-light">
              <tr>
                <th>Name</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Date / Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className={isCompleted ? "table-success" : null}>
                    {task.name}
                  </td>
                  <td>{task.assignedTo.name.split(" ")[0]}</td>
                  <td className={`table-${setPriorityColour(task.priority)}`}>
                    {task.priority}
                  </td>
                  <td>
                    {task.createdAt.split("T")[0]}
                    <span className="text-danger"> | </span>
                    {task.createdAt.split("T")[1].split(".")[0]}
                  </td>
                  <td className="text-right">
                    <Button
                      className="mx-1"
                      variant="success"
                      size="sm"
                      onClick={handleTaskCompleted}
                    >
                      <i className="fas fa-check"></i>
                    </Button>
                    <Button className="mx-1" variant="warning" size="sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                    {isAuth().role === "admin" ? (
                      <Button
                        className="mx-1"
                        variant="danger"
                        size="sm"
                        onClick={() => handleTaskRemove(task._id)}
                      >
                        <i className="fas fa-minus"></i>
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TasksScreen;
