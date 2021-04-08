import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

moment.locale("en-gb");

const RotaCreatorComponent = ({ users, setNewRotaAdded }) => {
  const [week, setWeek] = useState([
    { dayId: "", day: "", date: "", employees: [] },
  ]);
  const [newWeeklyRota, setNewWeeklyRota] = useState([
    { weeklyRota: [{ dayId: "", day: "", date: "", employees: [] }] },
  ]);

  const [rotaIsReady, setRotaIsReady] = useState(false);
  const { weeklyRota, dayId, day, date, employees } = newWeeklyRota;

  const handleWeekEndingDate = (e) => {
    let weekStartingDate = e.target.value;
    let weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let newWeek = [];

    for (let i = 0; i <= 6; i++) {
      let day = {};
      day.dayId = i;
      day.day = weekDays[i];
      day.date = moment(weekStartingDate).add(i, "days").format("LLLL");
      day.employees = [{ nameId: "", start: "", finish: "" }];
      newWeek.push(day);
      //console.log(newWeek);
    }

    setWeek(newWeek);
  };

  const handleResetWeek = () => {
    setWeek([{ dayId: "", day: "", date: "", employees: [] }]);
  };

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
  const handleRotaSubmit = (e) => {
    e.preventDefault();
    let newRota = { weeklyRota: [] };
    newRota.weeklyRota = [...week];
    console.log("weekly rota saved");
    setNewWeeklyRota(newRota);
    setRotaIsReady(true);
  };

  const submitNewRota = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/rota`,
      data: { weeklyRota, dayId, day, date, employees },
    })
      .then((response) => {
        handleResetWeek();
        toast.success("New Rota Created");
        setRotaIsReady(false);
      })
      .catch((error) => {
        /* console.log("ROTA CREATE ERROR", error.response.data); */
        setWeek({ ...week });
        /* toast.error(error.response.data.error); */
      });
  };

  useEffect(() => {
    if (rotaIsReady) {
      submitNewRota();
    }
  }, [rotaIsReady]);
  return (
    <Form onSubmit={handleRotaSubmit}>
      <ToastContainer />
      <Form.Row className="d-flex justify-content-between">
        <Form.Group as={Col}>
          <Form.Label>Week Start</Form.Label>
          <Form.Control
            type="date"
            onChange={handleWeekEndingDate}
            disabled={week.length > 1 && true}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>&nbsp;</Form.Label>
          <Button
            variant="danger"
            block
            onClick={handleResetWeek}
            disabled={week.length === 1 && true}
          >
            Reset
          </Button>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>&nbsp;</Form.Label>
          <Button
            variant="success"
            block
            type="submit"
            disabled={week.length < 2 && true}
          >
            Save
          </Button>
        </Form.Group>
      </Form.Row>

      {week.length > 1 ? (
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
                    <option value="">Select Employee</option>
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
                      block
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
                      <i className="fas fa-plus"></i>
                    </Button>
                  )}
                </Form.Group>
                <Form.Group>
                  <Button
                    className="mx-1"
                    block
                    disabled={day.employees.length === 1 ? true : false}
                    onClick={() => handleRemoveEmployee(day.dayId, i)}
                    variant="danger"
                  >
                    <i className="fas fa-minus"></i>
                  </Button>
                </Form.Group>
              </Form.Row>
            ))}
          </React.Fragment>
        ))
      ) : (
        <p className="text-danger">Please set week begining</p>
      )}
    </Form>
  );
};

export default RotaCreatorComponent;
