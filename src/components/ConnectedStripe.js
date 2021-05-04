import React, { useState, useEffect, Fragment } from 'react';

// External Imports
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';

// Internal Imports
import SpinnerLoader from './SpinnerLoader';
import { fetchUserHotels, deleteHotel } from '../redux/actions/hotelActions';

const ConnectedStripe = () => {

    // Getting instance of The auth State
    const auth = useSelector(state => state.auth);

    // Creating The Component States
    const [isLoading, setIsLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const fetchHotels = async token => {
        try {
            const response = await fetchUserHotels(token);
            setIsLoading(false);
            setHotels([...response.hotels]);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchHotels(auth.token);
    }, [auth.token]);

    // Render Helper Function
    const renderPosts = () => {
        return (
            <Table striped>
                <tbody>
                    {
                        hotels.map((hotel, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row"># {index + 1}</th>
                                    <td>
                                        <Link to={`/hotels/${hotel._id}`}>
                                            {hotel.title}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/edit/${hotel._id}`}>
                                            <button className="btn btn-primary">
                                                <AiFillEdit /> Edit
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                deleteHotel(auth.token, hotel._id, () => fetchHotels(auth.token));
                                            }}
                                        >
                                            <AiOutlineDelete /> Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        )
    };

    return (
        <Fragment>
            <div className="bg-info py-2 px-4 text-white d-flex justify-content-between align-items-center">
                <div>
                    <span>Your Registered Hotels</span>
                </div>
                <Link to="/new-hotel">
                    <button className="btn btn-secondary">Add New</button>
                </Link>
            </div>
            {   hotels &&
                renderPosts()
            }
            {
                isLoading &&
                <div className="container">
                    <div className="row py-5 mt-5">
                        <div className="col d-flex justify-content-center">
                            <SpinnerLoader />
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default ConnectedStripe;
