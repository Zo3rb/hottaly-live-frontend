import React, { Fragment } from 'react';

// External Imports
import { ToastContainer } from 'react-toastify';

// Internal Import
import AppRouter from './AppRouter';
import AppHeader from './components/AppHeader';

const App = () => {
  return (
    <Fragment>
      <AppHeader />
      <ToastContainer />
      <AppRouter />
    </Fragment>
  );
}

export default App;
