import React from 'react';

// External Imports 
import { Switch, Route } from 'react-router-dom';

// Internal Imports
import PrivateRoute from './components/PrivateRoute';
import { HomePage, Login, Register, Dashboard, StripeCallback, NewHotel, Hotel, EditHotel } from './pages';

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/reg" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/hotels/:id" component={Hotel} />
            <PrivateRoute exact path="/Dashboard" component={Dashboard} />
            <PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
            <PrivateRoute exact path="/new-hotel" component={NewHotel} />
            <PrivateRoute exact path="/edit/:id" component={EditHotel} />
        </Switch>
    );
}

export default AppRouter;