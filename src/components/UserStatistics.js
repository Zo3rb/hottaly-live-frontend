import React, { useState, useEffect, Fragment } from 'react';

// External Imports
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, CardTitle, CardSubtitle, Badge } from 'reactstrap';
import moment from 'moment';
import { FiSettings } from 'react-icons/fi';
import { getAccountBalance, getPayoutSettingsLink } from '../redux/actions/stripeActions';

const UserStatistics = () => {

    // Getting Instance of Use Dispatch
    const dispatch = useDispatch();

    // Getting Instance of Redux Auth state
    const auth = useSelector(state => state.auth);

    // Creating Balance State
    const [balance, setBalance] = useState({});

    // Creating Function Handler For Payout Settings
    const payoutSettingHandler = () => {
        dispatch(getPayoutSettingsLink(auth.token));
    };

    // Update The Balance By Dispatching Action
    const getNewBalance = async token => {
        try {
            const newBalance = await dispatch(getAccountBalance(token));
            setBalance({ ...newBalance });
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getNewBalance(auth.token);
    }, [auth.token]);

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-around text-center py-5 bg-dark mt-5">
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">
                            <span className="font-weight-bold text-info">Name: </span>{auth.user.name}
                        </CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                            <span className="font-weight-bold text-info">Email: </span>{auth.user.email}
                        </CardSubtitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                            <span className="font-weight-bold text-info">Joined: </span>{moment(auth.user.createdAt).fromNow()}
                        </CardSubtitle>
                    </CardBody>
                </Card>
                {
                    balance.available && balance.pending &&
                    <Fragment>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Pending Balance</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    <span className="font-weight-bold text-info">Available: </span>{balance.available[0].amount} / <Badge>{balance.available[0].currency}</Badge>
                                </CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    <span className="font-weight-bold text-info">Pending: </span>{balance.pending[0].amount} / <Badge>{balance.pending[0].currency}</Badge>
                                </CardSubtitle>
                            </CardBody>
                        </Card>
                    </Fragment>
                }
                {
                    auth.user && auth.user.stripe_account_id &&
                    <Fragment>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Payout Settings <span className="text-secondary" style={{ fontSize: "10px" }}>Click Icon</span></CardTitle>
                                <CardSubtitle className="text-center my-3">
                                    <FiSettings
                                        size="2em"
                                        style={{ cursor: "pointer" }}
                                        onClick={payoutSettingHandler}
                                    />
                                </CardSubtitle>
                                <small className="text-danger">You'll Be Redirected & back Again After Modifying Info</small>
                            </CardBody>
                        </Card>
                    </Fragment>
                }
            </div>
        </div>
    );
}

export default UserStatistics;
