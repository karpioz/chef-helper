import React, { useState, useEffect } from "react";
import { Row, Col, Table, Spinner, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import RotaCreatorComponent from '../components/RotaCreatorComponentTwo';
import AllRotasTableComponent from '../components/AllRotasTableComponent'

const AdminRotaCreatorScreen = () => {
  // state with useState hook
  const [rotas, setRotas] = useState([]);
  const [isFetchingRotas, setIsFetchingRotas] = useState(true);

  const [users, setUsers] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);

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

  // delete user function
  const handleDeleteRota = (id) => {
    console.log(`rota: ${id} has been deleted`);
  };

  // fetching rotas on load
  const fetchRotas = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/rota`
    );
    //console.log(response);
    if (response) {
      setRotas(response.data);
      setIsFetchingRotas(false);
    } else {
      console.log("something went wrong when fetching rota...");
    }
  };



  useEffect(() => {
    fetchUsers();
    fetchRotas();
    return () => {
      setUsers([]);
      setRotas([]);
    };
  }, []);

  return (
    <>
      <Row>
        <ToastContainer />
        <Col>
          <h1 className="text-center my-3">Staff Rota Management</h1>
        </Col>
      </Row>
      <Row>
          <h2 className="text-center my-3">All Rotas</h2>
          {isFetchingRotas ? (<Spinner />) : (
              <AllRotasTableComponent rotas={rotas} handleDeleteRota={handleDeleteRota}/>
          )}
      </Row>
      <Row>
      <h2 className="text-center my-3">Rota Creator</h2>
      </Row> 
        {isFetchingUsers ? (
          <Spinner />) : (<Row>
          <RotaCreatorComponent users={users}/>
      </Row>
        )}
    </>
  );
};

export default AdminRotaCreatorScreen;
