import React, { useState } from 'react';

// External Imports
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createHotel } from '../redux/actions/hotelActions';
import { useHistory } from 'react-router-dom';

// Internal Imports
import LocationInput from './LocationInput';

const HotelForm = () => {

    // Getting Instance of Browser History
    const history = useHistory();

    // Getting Instance of Auth state from Redux
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // Declaring All The data to Send
    const [data, setData] = useState({
        title: "",
        content: "",
        location: "",
        image: "https://via.placeholder.com/300/?text=preview",
        price: 20,
        from: "",
        to: "",
        beds: "",
    });

    // Creating the Input Changing Function
    const onInputChange = e => {
        setData({
            ...data, [e.target.name]: e.target.value
        });
    };

    // Creating Uploading && Preview Image Handler
    const changePreviewImage = async e => {
        try {
            // Getting The Image
            let imageFile = e.target.files[0];
            // Sending Our Image to Cloud API
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('upload_preset', "instaclone");
            formData.append('cloud_name', 'dqyayf3rf');
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dqyayf3rf/upload`, formData);
            setData({ ...data, image: response.data.url });
        } catch (error) {
            toast.error(error.message, {
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

    // Creating The Form Submission Function
    const onFormSubmit = e => {
        e.preventDefault();
        dispatch(createHotel(auth.token, data));
        // Redirect User to its Dashboard
        history.push('/dashboard');
    };

    // Creating Location Setter For props Drilling
    const locationSetter = value => {
        setData({ ...data, location: value });
    };

    return (
        <div className="container">
            <div className="row py-3">
                <div className="col-sm-12 col-md-10 col-lg-8 offset-sm-0 offset-md-1 offset-lg-0">
                    <h1 className="h2 border-bottom pb-5 mb-5">Add a New Hotel</h1>
                    <Form onSubmit={onFormSubmit}>
                        <FormGroup>
                            <Label
                                htmlFor="fileInput"
                                className="border border-primary p-3"
                                style={{ cursor: "pointer" }}
                            >
                                Upload Image <FaCloudUploadAlt size="2em" />
                            </Label>
                            <Input
                                type="file"
                                name="image"
                                id="fileInput"
                                onChange={changePreviewImage}
                                hidden
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="title-input">Title: </Label>
                            <Input
                                type="text"
                                name="title"
                                id="title-input"
                                placeholder="Add a Title"
                                onChange={onInputChange}
                                required
                                value={data.title}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="content-input">Content: </Label>
                            <Input
                                type="textarea"
                                name="content"
                                id="content-input"
                                onChange={onInputChange}
                                style={{ resize: "none", overflowY: "scroll" }}
                                value={data.content}
                                required
                            />
                        </FormGroup>
                        <LocationInput location={data.location} locationSetter={locationSetter} />
                        <FormGroup>
                            <Label htmlFor="price-input">Price: </Label>
                            <Input
                                type="number"
                                name="price"
                                id="price-input"
                                onChange={onInputChange}
                                min="20"
                                value={data.price}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="from-input">From: </Label>
                            <Input
                                type="date"
                                name="from"
                                id="from-input"
                                onChange={onInputChange}
                                min={new Date().toISOString().slice(0, 10)}
                                value={data.from}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="to-input">To: </Label>
                            <Input
                                type="date"
                                name="to"
                                id="to-input"
                                onChange={onInputChange}
                                min={new Date().toISOString().slice(0, 10)}
                                value={data.to}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="beds-input">Beds Number: </Label>
                            <Input
                                type="number"
                                name="beds"
                                id="beds-input"
                                onChange={onInputChange}
                                min="1"
                                max="4"
                                step="1"
                                value={data.beds}
                                required
                            />
                        </FormGroup>
                        <Button color="primary">Save Hotel</Button>
                    </Form>
                </div>
                <div className="d-none d-lg-block col-lg-4">
                    <img src={data.image} alt="preview" className="img img-fluid" />
                    <hr />
                    <pre>
                        {JSON.stringify({ ...data, image: undefined }, null, 4)}
                    </pre>
                </div>
            </div>
        </div>
    );
}

export default HotelForm;
