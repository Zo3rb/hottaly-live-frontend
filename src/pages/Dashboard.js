import React, { Fragment } from 'react';

// Internal Imports
import UserStatistics from '../components/UserStatistics';
import DashboardTabs from '../components/DashboardTabs';

const Dashboard = () => {
    return (
        <Fragment>
            <UserStatistics />
            <DashboardTabs />
        </Fragment>
    );
}

export default Dashboard;
