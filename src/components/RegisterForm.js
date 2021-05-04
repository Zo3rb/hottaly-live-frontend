import React, { Fragment, useState } from 'react';

// External Imports
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';

const RegisterForm = props => {

    // Getting Instance of The Browser History
    const history = useHistory();

    // Creating The FormData State
    const [formData, setFormData] = useState({
        name: "",
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
    const onFormSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post("YOUR_API_LINK/api/register", formData);
            toast.success('Successfully Registered. Please Login', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/login');
        } catch (error) {
            toast.error(error.response.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <Fragment>
            <div className="container">
                <div className="row py-5">
                    <div className="col-sm-12 col-md-10 col-lg-8 offset-sm-0 offset-md-1 offset-lg-2">
                        <h1 className="h2 border-bottom pb-5 mb-5">Register a New User</h1>
                        <Form onSubmit={onFormSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Email:</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="e.g: Example@email.net"
                                    onChange={onInputChange}
                                    required={true}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleName">Name:</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="exampleName"
                                    placeholder="e.g: John Doe"
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
                                    formData.email === "" ||
                                    formData.name === "" ||
                                    formData.password === ""
                                }
                            >
                                Register
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default RegisterForm;
