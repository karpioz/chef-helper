import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Spinner } from "react-bootstrap";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { LinkContainer } from "react-router-bootstrap";

moment.locale("en-gb");

const RotaEditComponent = ({ users, rota, submitEditedRota }) => {
  const [isRotaChanged, setIsRotaChanged] = useState(false);
  const [updatedRota, setUpdatedRota] = useState([
    { weeklyRota: [{ dayId: "", day: "", date: "", employees: [] }] },
  ]);

  /* const { weeklyRota } = updatedRota; */
  const [week, setWeek] = useState([
    { dayId: "", day: "", date: "", employees: [] },
  ]);

  const handleChangeEmployees = (e, index, idx) => {
    const { name, value } = e.target;
    const employeesArr = [...week];

    employeesArr[index].employees[idx][name] = value;
    setWeek(employeesArr);
  };

  // adding new employee input to the specific day
  const handleAddEmployee = (index) => {
    const employeesArr = [...week];
    employeesArr[index].employees.push({ nameId: "", start: "", finish: "" });
    setWeek(employeesArr);
  };

  // removing employee input from the specific day
  const handleRemoveEmployee = (index, empIndex) => {
    const employeesArr = [...week];
    employeesArr[index].employees.splice(empIndex, 1);
    setWeek(employeesArr);
  };

  // saving the rota
  const handleRotaUpdate = (e) => {
    e.preventDefault();
    let newUpdatedRota = { weeklyRota: [] };
    newUpdatedRota.weeklyRota = [...week];
    setUpdatedRota(newUpdatedRota);
    console.log("updated rota saved");
    setIsRotaChanged(true);
    toast.success(`Rota has been changed. Please click save now!`);
  };

  const getUserNames = (id) => {
    let name = "Select User";
    if (!id) {
      return name;
    }

    if (users) {
      const user = users.filter((user) => user._id === id);
      name = user[0].name;
      return name;
    }
  };

  useEffect(() => {
    setWeek(rota.weeklyRota);
  }, [rota]);

  const saveRotaToDB = () => {
    if (isRotaChanged) {
      submitEditedRota(updatedRota);
    }
  };

  useEffect(() => {
    console.log(week);
    console.log(updatedRota);
  }, [week, updatedRota]);

  return (
    <Container>
      {!week ? (
        <Spinner />
      ) : (
        <Form onSubmit={handleRotaUpdate}>
          <ToastContainer />
          <Form.Row className="d-flex justify-content-between">
            <Form.Group as={Col}>
              <Form.Label>Week Start</Form.Label>
              <Form.Control
                type="date"
                disabled={week.length > 1 && true}
                value={moment(rota.weekStart).format("YYYY-MM-DD")}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>&nbsp;</Form.Label>
              <Button
                variant="warning"
                block
                type="submit"
                disabled={week.length < 2 && true}
              >
                Update Rota
              </Button>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>&nbsp;</Form.Label>
              <Button
                variant="success"
                block
                onClick={saveRotaToDB}
                disabled={week.length < 2 && true}
              >
                Save
              </Button>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>&nbsp;</Form.Label>
              <LinkContainer to={`/admin/rota`}>
                <Button variant="danger" block>
                  Cancel
                  <i class="fas fa-history mx-3"></i>
                </Button>
              </LinkContainer>
            </Form.Group>
          </Form.Row>

          {week ? (
            week.map((day, i) => (
              <React.Fragment key={i}>
                <Form.Row key={i}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder={day.date}
                      name={day.day}
                      defaultValue={day.date}
                      className={
                        i > 5 ? "bg-danger text-light" : "bg-info text-light"
                      }
                    />
                  </Form.Group>
                </Form.Row>
                {day.employees.map((emp, i) => (
                  <Form.Row key={i}>
                    <Form.Group>
                      <Form.Control
                        as="select"
                        onChange={(e) => handleChangeEmployees(e, day.dayId, i)}
                        name="nameId"
                        required
                      >
                        <option>{getUserNames(emp.nameId)}</option>
                        {users.length !== 0 ? (
                          users.map((user) => (
                            <option key={user._id} value={user._id}>
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
                    <Form.Group>
                      <Form.Control
                        type="text"
                        onChange={(e) => handleChangeEmployees(e, day.dayId, i)}
                        placeholder="start hh:mm"
                        name="start"
                        pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                        title="HH:MM 24-hrs format"
                        value={emp.start}
                        required
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please use valid HH:MM 24-hrs format.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="finish"
                        pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                        title="HH:MM 24-hrs format"
                        placeholder="finish hh:mm"
                        value={emp.finish}
                        onChange={(e) => handleChangeEmployees(e, day.dayId, i)}
                        required
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      {day.employees.length - 1 === i && (
                        <Button
                          className="mx-1"
                          disabled={
                            emp.nameId.length === 0 ||
                            emp.start.length === 0 ||
                            emp.finish.length === 0
                              ? true
                              : false
                          }
                          onClick={() => handleAddEmployee(day.dayId)}
                          variant="success"
                        >
                          <i class="fas fa-user-plus"></i>
                        </Button>
                      )}
                    </Form.Group>
                    <Form.Group>
                      <Button
                        className="mx-1"
                        disabled={day.employees.length === 1 ? true : false}
                        onClick={() => handleRemoveEmployee(day.dayId, i)}
                        variant="danger"
                      >
                        <i class="fas fa-user-minus"></i>
                      </Button>
                    </Form.Group>
                  </Form.Row>
                ))}
              </React.Fragment>
            ))
          ) : (
            <p className="text-danger">Fetching rota to edit</p>
          )}
        </Form>
      )}
    </Container>
  );
};

export default RotaEditComponent;
