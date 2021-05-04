import React, { useEffect } from 'react';

// External Imports
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Internal Imports
import { getStatusAccount } from '../redux/actions/stripeActions';

const StripeCallback = () => {

    // Getting Instance of The Browser History
    const history = useHistory();

    // Getting Instance of Redux State
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    // Once The Component get Mounted We Update Current Redux User State
    useEffect(() => {
        dispatch(getStatusAccount(auth.token, () => history.push('/dashboard')));
    }, [dispatch, history, auth.token]);

    return (
        <div className="container">
            <div className="row p-5">
                <div className="col d-flex justify-content-center">
                    <h2 className="text-info">Please Wait You'll be Redirected Automatically ...</h2>
                </div>
            </div>
        </div>
    );
};

export default StripeCallback;
