import React, { useState, useEffect } from "react";
import { Form, Col, Button } from "react-bootstrap";
import moment from "moment";
import axios from "axios";

moment.locale("en-gb");

const RotaCreatorComponent = () => {
  const [users, setUsers] = useState([]);
  const [employeesArr, setEmployeesArr] = useState([
    { name: "", start: "", finish: "" },
  ]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);
  const [week, setWeek] = useState([]);
  const [rota, setRota] = useState([]);

  // fetching users on load
  const fetchUsers = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/users/names`
    );
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
  }, []);

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
      day.day = weekDays[i];
      day.date = moment(weekStartingDate).add(i, "days").format("LLLL");
      newWeek.push(day);
      console.log(newWeek);
    }

    setWeek(newWeek);
  };

  const handleRotaInputs = (name) => (e) => {
    setEmployeesArr({ ...employeesArr, [name]: e.target.value });
  };

  const handleAddEmployee = (index) => {
    //
  };

  useEffect(() => {
    console.log("week state: " + week);
    console.table("employeesArr state: " + employeesArr);
  }, [week, employeesArr]);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Select week starting Monday</Form.Label>
        <Form.Control
          type="date"
          onChange={handleWeekEndingDate}
        ></Form.Control>
      </Form.Group>
      <Form.Row>
        {week.length !== 0 ? (
          <>
            <Form.Group as={Col}>
              <Form.Label>Select Day:</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => console.log(e.target.value)}
              >
                <option>Select Day</option>
                {week.length !== 0 ? (
                  week.map((day) => (
                    <option key={day.day} value={day.date}>
                      {day.day}
                    </option>
                  ))
                ) : (
                  <option className="bg-danger text-light">
                    Error fetching days
                  </option>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Select Employee:</Form.Label>
              <Form.Control
                as="select"
                onChange={handleRotaInputs("name")}
                name="employee"
              >
                <option>Select Employee</option>
                {users.length !== 0 ? (
                  users.map((user) => (
                    <option key={user._id} value={user.name}>
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
              <Form.Label>Start</Form.Label>
              <Form.Control
                type="time"
                onChange={handleRotaInputs("start")}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Finish</Form.Label>
              <Form.Control
                type="time"
                onChange={handleRotaInputs("finish")}
              ></Form.Control>
            </Form.Group>
            <Button disabled={true} onClick={handleAddEmployee(0)}>
              +
            </Button>
          </>
        ) : (
          <p className="text-danger">Please set week begining</p>
        )}
      </Form.Row>
    </Form>
  );
};

export default RotaCreatorComponent;
