import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import jwt from "jsonwebtoken";

const ActivateAccountScreen = ({ location, history, match }) => {
  // state with useState hook
  const [formData, setFormData] = useState({
    name: "",
    token: "",
    show: true,
  });

  // grabing token using useEffect hook
  useEffect(() => {
    let token = match.params.token;
    // decoding name from the token using jsonwebtoken
    let { name } = jwt.decode(token);
    // console.log(token);
    // saving name and token in the state
    if (token) {
      setFormData({ ...setFormData, name, token });
    }
  }, [match.params.token]);

  // destructuring state
  const { name, token, show } = formData;

  // Activating the account
  const clickActivate = () => {
    // axios to connect with backend
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/activate`,
      data: { token },
    })
      .then((response) => {
        setFormData({
          ...formData,
          show: false,
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("ACCOUNT ACTIVATION", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <>
      <ToastContainer />

      <h1 className="text-center">Welcome {name} </h1>
      <p>Please click button below to complete the registration process.</p>

      <Button onClick={clickActivate} variant={"success"}>
        Activate Account
      </Button>
    </>
  );
};

export default ActivateAccountScreen;
