import React, { useState, useEffect } from "react";
import { Form, Col, Button } from "react-bootstrap";
import moment from "moment";
import axios from "axios";

moment.locale("en-gb");

const RotaCreatorComponent = () => {
  const [users, setUsers] = useState([]);
  const [employeesArr, setEmployeesArr] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);
  const [week, setWeek] = useState([
    { dayId: "", day: "", name: "", employees: [] },
  ]);

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
      day.dayId = i;
      day.day = weekDays[i];
      day.date = moment(weekStartingDate).add(i, "days").format("LLLL");
      day.employees = [{ nameId: "", start: "", finish: "" }];
      newWeek.push(day);
      //console.log(newWeek);
    }

    setWeek(newWeek);
  };

  const handleChangeEmployees = (e, index, idx) => {
    const { name, value } = e.target;
    const employeesArr = [...week];

    console.log(index);

    employeesArr[index].employees[idx][name] = value;
    setWeek(employeesArr);
  };
  const handleAddEmployee = (index) => {
    
    const employeesArr = [...week];
    employeesArr[index].employees.push({ nameId: "", start: "", finish: "" })
    setWeek(employeesArr);

  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Select week starting Monday</Form.Label>
        <Form.Control
          type="date"
          onChange={handleWeekEndingDate}
        ></Form.Control>
      </Form.Group>

      {week.length !== 0 ? (
        week.map((day, i) => (
          <React.Fragment key={i}>
          <Form.Row key={i}>
            <Form.Group>
              {/* <Form.Label>Day</Form.Label> */}
              <Form.Control
                type="text"
                placeholder={day.date}
                name={day.day}
                defaultValue={day.date}
                className={i > 5 ? "bg-danger text-light" : "bg-info text-light"}
              />
            </Form.Group>
            </Form.Row>
            {day.employees.map((emp, i) => (
              <Form.Row key={i}>
                <Form.Group>
                  {/* {day.employees[`${i < 2}`] ? (<Form.Label>Select Employee:</Form.Label>) : null} */}
                  <Form.Control
                    as="select"
                    onChange={(e) => handleChangeEmployees(e, day.dayId, i)}
                    name="nameId"
                  >
                    <option>Select Employee</option>
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
                  {/* <Form.Label>Start</Form.Label> */}
                  <Form.Control
                    type="text"
                    onChange={(e) => handleChangeEmployees(e, day.dayId, i)}
                    placeholder="start hh:mm"
                    name="start"
                    value={emp.start}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  {/* <Form.Label>Finish</Form.Label> */}
                  <Form.Control
                    type="text"
                    name="finish"
                    placeholder="finish hh:mm"
                    value={emp.finish}
                    onChange={(e) => handleChangeEmployees(e, day.dayId, i)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  {/* <Form.Label>&nbsp;</Form.Label> */}
                  <Button
                    className="mx-1"
                    block
                    disabled={false}
                    onClick={(e) => handleAddEmployee(day.dayId)}
                    variant="warning"
                  >
                    <i className="fas fa-plus"></i>
                  </Button>{" "}
                </Form.Group>
              </Form.Row>
            ))}
          </React.Fragment>
        ))
      ) : (
        <p className="text-danger">Please set week begining</p>
      )}

      {JSON.stringify(week)}
    </Form>
  );
};

export default RotaCreatorComponent;
