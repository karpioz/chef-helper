import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import moment from "moment";

moment.locale("en-gb");

const RotaCreatorComponent = () => {
  const [rota, setRota] = useState([]);

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
    let newRota = [];

    for (let i = 0; i <= 6; i++) {
      let day = { day: "", date: "" };
      day.day = weekDays[i];
      day.date = moment(weekStartingDate).add(i, "days").format("LLLL");
      console.log(day);
      newRota.push(day);
    }

    setRota(newRota);

    console.log(rota);
  };

  useEffect(() => {
    console.log(rota);
  }, [rota]);

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
        <Form.Group as={Col}>
          <Form.Label>Select Day:</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => console.log(e.target.value)}
          >
            <option>Select Day</option>
            {rota.length !== 0 ? (
              rota.map((day) => (
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
        <Form.Group>
          <Form.Label>Start</Form.Label>
          <Form.Control
            type="time"
            onChange={(e) => console.log(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Finish</Form.Label>
          <Form.Control
            type="time"
            onChange={(e) => console.log(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default RotaCreatorComponent;
