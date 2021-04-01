import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

function RotaDisplayComponent() {
  const [employees, setEmployees] = useState([]);
  const [rota, setRota] = useState([]);
  const [isFetchingEmployees, setIsFetchingEmployees] = useState(true);
  const [isFetchingRota, setIsFetchingRota] = useState(true);

  const getEmployees = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/users/names`
    );
    if (response) {
      setEmployees(response.data);
      setIsFetchingEmployees(false);
    } else {
      console.log("something went wrong when fetching employees...");
    }
  };

  const getRota = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/rota`);
    if (response) {
      setRota(response.data);
      setIsFetchingRota(false);
    } else {
      console.log("something went wrong when fetching rota...");
    }
  };

  useEffect(() => {
    getEmployees();
    getRota();
  }, []);

  return (
    <>
      {!isFetchingEmployees && !isFetchingRota ? (
        rota.map((week) => (
          <React.Fragment key={week._id}>
            <h3>
              Rota for week starting:{" "}
              <strong className="text-success">
                {week.weekStart.substring(0, 15)}
              </strong>
            </h3>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  {week.weeklyRota.map((day) => (
                    <th key={day.day}>{day.day.substring(0, 2)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    {week.weeklyRota.map((day) => (
                      <td>
                        {employee._id === day.employees.nameId ? (
                          <p
                            className="text-success"
                            key={day.employees.nameId}
                          >
                            {day.employees.start}&nbsp;|&nbsp;
                            {day.employees.finish}
                          </p>
                        ) : (
                          <p key={day.employees.nameId} className="text-danger">
                            off
                          </p>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </React.Fragment>
        ))
      ) : (
        <p>loading data...</p>
      )}
      {JSON.stringify(rota)}
      --------
      {JSON.stringify(employees)}
    </>
  );
}

export default RotaDisplayComponent;
