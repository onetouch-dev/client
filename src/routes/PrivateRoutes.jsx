import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    if (!localStorage.getItem('token')) {
        return (
            <Redirect path="/" to="/login" />
        );
    }
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <>
                    <Component {...matchProps} />
                </>
            )}
        />
    );
};

export default PrivateRoute;
