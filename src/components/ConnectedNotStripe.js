import React from 'react';

// External Imports
import { useSelector, useDispatch } from 'react-redux';
import { FaCcStripe } from 'react-icons/fa';
import { Button } from 'reactstrap';

// Internal Imports
import { connectUser } from '../redux/actions/stripeActions';

const ConnectedNotStripe = () => {

    // Getting Instance of The Auth State
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <div className="container">
            <div className="row py-3">
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 text-center">
                    <h2><FaCcStripe size={100} /></h2>
                    <h6 className="lead text-primary font-weight-bold">You'll be redirected to setup Stripe to be able to add hotel</h6>
                    <Button
                        color="primary"
                        onClick={() => dispatch(connectUser(auth.token))}
                    >
                        Setup Payment
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConnectedNotStripe;
