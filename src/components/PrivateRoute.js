import React, { Component } from "react";
import { Route, Navigate} from 'react-router-dom';
import { auth } from "../firebase";

const PrivateRoute = ({ component: Component, ...rest }) => {
    <Route
    {...rest}
    render={props =>
        auth.currentUser ? (
            <Component {...props} />
        ) : (
            <Navigate to="/login" />
        )
    }
    />
};

export default PrivateRoute;