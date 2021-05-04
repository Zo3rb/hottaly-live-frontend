import React, { Fragment, useState, useEffect } from 'react';

// External Imports
import moment from 'moment';

// Internal Imports
import { fetchSingleHotel } from '../redux/actions/hotelActions';
import SpinnerLoader from '../components/SpinnerLoader';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ImWarning } from 'react-icons/im';


const Hotel = props => {

    // Creating The Component State
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // Creating Helper Function to Fetch The Hotel Data
    const fetchAndSetData = async id => {
        const hotelData = await fetchSingleHotel(id);
        const { title, content, location, image, price, from, to, beds } = hotelData;
        setData({ title, content, location, image, price, from, to, beds, });
        setIsLoading(false);
    };

    // Creating Helper Function to Generate The Booking Button
    const renderBookingButton = date => {
        const promotion = new Date(date).getDate() - new Date().getDate();
        return promotion > 1
            ? <button className="btn btn-primary btn-block" onClick={toggle}>
                Book It Now
            </button>
            : <button className="btn btn-danger btn-block" disabled>
                The Offer Is No More Available
            </button>
    };

    // Fetch The Hotel Once The Component Get Loaded
    useEffect(() => {
        fetchAndSetData(props.match.params.id);
    }, [props.match.params.id]);

    // Create Render Helper Function
    const renderHotel = () => {
        return !isLoading ? (
            <Fragment>
                <h1 className="text-center text-white mb-3 p-5 bg-secondary">{data.title} <span className="badge badge-primary">{data.price}$</span></h1>
                <div className="container">
                    <div className="row py-3">
                        <div className="col-md-6 mb-sm-2 mb-md-0 ">
                            <img
                                src={data.image}
                                title={data.title}
                                alt={data.title}
                                className="img img-fluid"
                            />
                        </div>
                        <div className="col-md-6">
                            <h6 className="d-block bg-success text-white py-2 px-1 rounded text-center" style={{ lineHeight: "100%" }}>Location - {data.location}</h6>
                            <hr />
                            <p className="card-text">Details - {data.content}</p>
                            <p className="card-text my-0">Duration {new Date(data.from).toLocaleDateString()} - {new Date(data.to).toLocaleDateString()}</p>
                            <p className="card-text my-0"><small className="text-muted">Last updated: {moment(data.updatedAt).fromNow()}</small></p>
                            <p className="card-text my-0"><small className="text-muted">Created: {moment(data.createdAt).fromNow()}</small></p>
                            <div className="fixed-bottom">
                                {renderBookingButton(data.from)}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        ) : <div className="container">
            <div className="row py-5">
                <div className="col d-flex justify-content-center">
                    <SpinnerLoader />
                </div>
            </div>
        </div>
    };

    return (
        <Fragment>
            {renderHotel()}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Sorry</ModalHeader>
                <ModalBody>
                    <div className="text-center row py-3">
                        <div className="col-12 mb-3">
                            <ImWarning size="5em" />
                        </div>
                        <div className="col-12">
                            <p className="text-danger">unfortunately we can't process this step because we don't have an activated bank account and this only for testing purpose</p>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    );
}

export default Hotel;
