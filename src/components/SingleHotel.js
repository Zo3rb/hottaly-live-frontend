import React from 'react';

// External Imports
import moment from 'moment';
import { Link } from 'react-router-dom';

const SingleHotel = ({ hotel }) => {

    const promotion = new Date(hotel.from).getDate() - new Date().getDate();

    return (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={hotel.image} className="card-img" alt={hotel.title} />
                    <Link to={`/hotels/${hotel._id}`} style={{ textDecoration: "none" }}>
                        <button className="btn btn-secondary btn-block mt-md-2 rounded-0">
                            More Details
                        </button>
                    </Link>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">
                            {hotel.title} - <span className="badge badge-primary">{hotel.price}$</span>
                        </h5>
                        <hr />
                        <div className={`alert ${promotion > 1 ? "alert-success" : "alert-danger"}`} role="alert">
                            Offer Available for: {promotion > 1 ? `${promotion} Day/s` : "Offer Not Available"}
                        </div>
                        <h6 className="d-block bg-success text-white py-2 px-1 rounded text-center" style={{ lineHeight: "100%" }}>Location - {hotel.location}</h6>
                        <hr />
                        <p className="card-text">Details - {hotel.content}</p>
                        <p className="card-text my-0">Duration {new Date(hotel.from).toLocaleDateString()} - {new Date(hotel.to).toLocaleDateString()}</p>
                        <p className="card-text my-0"><small className="text-muted">Last updated: {moment(hotel.updatedAt).fromNow()}</small></p>
                        <p className="card-text my-0"><small className="text-muted">Created: {moment(hotel.createdAt).fromNow()}</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleHotel;
