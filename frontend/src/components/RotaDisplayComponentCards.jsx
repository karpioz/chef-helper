import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import RotaDayCardComponent from "../components/RotaDayCardComponent";

function RotaDisplayComponentCards() {
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
                {week.weekStart.substring(0, 16)}
              </strong>
            </h3>
            <Row>
              {week.weeklyRota.map((day, i) => (
                <Col sm={12} md={6} lg={4} xl={3} key={day.dayId + i}>
                  <RotaDayCardComponent
                    key={day.dayId}
                    day={day}
                    employees={employees}
                  />
                </Col>
              ))}
            </Row>
          </React.Fragment>
        ))
      ) : (
        <p>loading data...</p>
      )}
    </>
  );
}

export default RotaDisplayComponentCards;
