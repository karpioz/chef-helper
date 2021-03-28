import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function RotaDayCardComponent({ day, employees }) {
  const dayOfTheWeek = day.day;
  const date = day.date;
  const dateFormatted = date.split(",");

  const employeesArr = [...employees];

  const getName = (id) => {
    const name = employeesArr.filter((e) => e._id === id);
    return name[0]["name"];
  };

  return (
    <Card
      className="my-3 rounded"
      border={day.dayId === 6 ? "danger" : "secondary"}
    >
      <Card.Header>
        <Card.Title>
          <strong
            className={`${
              day.dayId === 6 ? "text-danger" : "text-secondary"
            } rota-dayCard__day`}
          >
            {dayOfTheWeek.substring(0, 3)}
          </strong>
        </Card.Title>
        {`${dateFormatted[1]}, ${dateFormatted[2].substring(0, 5)}`}
      </Card.Header>
      <Card.Body>
        <ListGroup flush="true">
          {day.employees.map((emp, i) => (
            <ListGroup.Item
              key={emp._id}
              className="d-flex justify-content-between"
            >
              <p>{getName(emp.nameId)}</p>
              <p className="text-info">
                <strong>{emp.start}</strong>
              </p>
              <p>&nbsp;|&nbsp;</p>
              <p className="text-info">
                <strong>{emp.finish}</strong>
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default RotaDayCardComponent;
