import React, { useState, useEffect, Fragment } from 'react';

// External Imports
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// Internal Imports
import SpinnerLoader from '../components/SpinnerLoader';
import { fetchAllHotels } from '../redux/actions/hotelActions';
import SingleHotel from '../components/SingleHotel';

const HomePage = () => {
    // Creating The Component States
    const [isLoading, setIsLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const [res, setRes] = useState(5);
    const fetchHotels = async q => {
        try {
            const response = await fetchAllHotels(q);
            setIsLoading(false);
            setHotels([...response.hotels]);
            if (response.allResults > res) setRes(response.allResults);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    // Render Helper Function
    const renderPosts = () => {
        return (
            <div className="container">
                <div className="row py-3">
                    <div className="col d-flex justify-content-center">
                        <div>
                            {hotels.map((hotel, index) => {
                                return <SingleHotel key={index} hotel={hotel} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const renderPaginate = () => {
        return res > 5
            ? (
                <div className="container">
                    <div className="row py-2 px-3">
                        <div className="col d-flex justify-content-center">
                            <Pagination aria-label="Page navigation example">
                                {Array.from(Array(Math.ceil(res / 5)), (x, i) => {
                                    return (
                                        <PaginationItem key={i}>
                                            <PaginationLink onClick={() => fetchHotels({ page: i + 1 })}>
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                })}
                            </Pagination>
                        </div>
                    </div>
                </div>
            )
            : null
    };

    return (
        <Fragment>
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
            {renderPaginate()}
        </Fragment>
    );
}

export default HomePage;