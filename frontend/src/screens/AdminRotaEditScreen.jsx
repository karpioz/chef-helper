import React, { useState, useEffect } from "react";
import { Row, Col, Table, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import RotaEditComponent from "../components/RotaEditComponent";

const AdminRotaEditScreen = () => {
  // state with useState hook
  const [rota, setRota] = useState([]);
  const [isFetchingRota, setIsFetchingRota] = useState(true);

  const [users, setUsers] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);

  const { id } = useParams();

  // fetching users on load
  const fetchUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/users/`);
    //console.log(response);
    if (response) {
      setUsers(response.data);
      setIsFetchingUsers(false);
    } else {
      console.log("something went wrong when fetching users...");
    }
  };

  // fetching rota on load
  const fetchRotaById = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/rota/${id}`);
    //console.log(response);
    if (response) {
      setRota(response.data);
      setIsFetchingRota(false);
    } else {
      console.log("something went wrong when fetching rota...");
    }
  };

  const submitEditedRota = async (data) => {
    const { weeklyRota } = data;
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/rota/${id}`,
      { weeklyRota }
    );
    if (response) {
      console.log(JSON.stringify(data));
      toast.success(response.data.message);
    } else {
      //console.log("ROTA UPDATE ERROR", error.response.data);
      toast.error(response.data.error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRotaById();
    return () => {
      setUsers([]);
      setRota([]);
    };
  }, []);

  return (
    <>
      <Row>
        <ToastContainer />
        <Col>
          <h1 className="text-center my-3">Edit Rota</h1>
        </Col>
      </Row>
      <Row>
        <h2 className="text-center my-3">All Rotas</h2>
        {isFetchingRota && isFetchingUsers ? (
          <Spinner />
        ) : (
          <>
            <p>Rota for editing goes here</p>
            {JSON.stringify(rota)}
            <hr />
            {JSON.stringify(users)}
            <RotaEditComponent
              rota={rota}
              users={users}
              RotaId={id}
              submitEditedRota={submitEditedRota}
            />
          </>
        )}
      </Row>
    </>
  );
};

export default AdminRotaEditScreen;
