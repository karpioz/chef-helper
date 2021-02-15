import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../utilities/authUtilities";

const ProtectedAdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isAuth().role === "admin" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  ></Route>
);

export default ProtectedAdminRoute;
