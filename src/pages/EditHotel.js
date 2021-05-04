import React, { Fragment } from 'react';

// Internal Imports
import EditHotelForm from '../components/EditHotelForm';

const EditHotel = props => {
    return (
        <Fragment>
            <EditHotelForm id={props.match.params.id} />
        </Fragment>
    );
}

export default EditHotel;
