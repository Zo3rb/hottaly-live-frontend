import React, { useState, Fragment } from 'react';

// External Imports
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Internal Imports
import { login } from '../redux/actions/authActions';

const LoginForm = props => {

    // Getting Instance of The Browser History
    const history = useHistory();

    // Getting Instance of mapDispatchToProps Function
    const dispatch = useDispatch();

    // Creating The FormData State
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Creating Controlled Input Changing Function
    const onInputChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Creating The Submission Function
    const onFormSubmit = e => {
        e.preventDefault();
        dispatch(login(formData, () => history.push("/dashboard")));
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row py-5">
                    <div className="col-sm-12 col-md-10 col-lg-8 offset-sm-0 offset-md-1 offset-lg-2">
                        <h1 className="h2 border-bottom pb-5 mb-5">Please Login</h1>
                        <Form onSubmit={onFormSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Email:</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="e.g: Example@email.net"
                                    onChange={onInputChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password:</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="e.g: ******"
                                    onChange={onInputChange}
                                    minLength={6}
                                />
                            </FormGroup>
                            <Button
                                color="success"
                                onClick={onFormSubmit}
                                disabled={
                                    formData.email === "" || formData.password === ""
                                }
                            >
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default LoginForm;
