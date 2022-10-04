import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Topbar } from "../components";

const PrivateRoute = ({ component: Component, ...rest }) => {
    if (!localStorage.getItem("access-token")) {
        return (
            <Redirect path="/" to="/login" />
        );
    }
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <>
                    <Topbar {...matchProps} />
                    <Component {...matchProps} />
                </>
            )}
        />
    );
};

export default PrivateRoute;
