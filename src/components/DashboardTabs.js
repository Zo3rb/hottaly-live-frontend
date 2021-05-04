import React, { useState } from 'react';

// External Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { useSelector } from 'react-redux';
import { ImWarning } from 'react-icons/im';

// Internal Imports
import ConnectedStripe from './ConnectedStripe';
import ConnectedNotStripe from './ConnectedNotStripe';

const DashboardTabs = () => {

    // Getting Auth State from Redux
    const auth = useSelector(state => state.auth);

    // States for The Tabs
    const [activeTab, setActiveTab] = useState('2');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={activeTab === "1" && "active"} style={{ cursor: "pointer" }}
                        onClick={() => { toggle('1'); }}
                    >
                        Your Bookings
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={activeTab === "2" && "active"} style={{ cursor: "pointer" }}
                        onClick={() => { toggle('2'); }}
                    >
                        Hotels
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <div className="container">
                        <div className="text-center row pt-5">
                            <div className="col-12 mb-3">
                                <ImWarning size="5em" />
                            </div>
                            <div className="col-12">
                                <p className="text-danger">unfortunately we can't process this step because we don't have an activated bank account and this only for testing purpose</p>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    {
                        auth &&
                            auth.user &&
                            auth.user.stripe_account_id
                            ? <ConnectedStripe />
                            : <ConnectedNotStripe />
                    }
                </TabPane>
            </TabContent>
        </div>
    );
}

export default DashboardTabs;
