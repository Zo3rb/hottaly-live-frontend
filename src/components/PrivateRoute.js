import React from 'react';

// External Imports
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {

    let auth = useSelector(state => state.auth);

    return (
        <Route
            {...rest}
            render={props =>
                auth
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            }
        />
    )
};

export default PrivateRoute;
