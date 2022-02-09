import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, login, logOut } from './redux/actions/userAction';
// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Loader from './components/Loader';
import PageRouter from './routes/PageRouter';
const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userLogin);
  const { loading: orgLoading } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (loading) {
      dispatch(getDetails());
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <PageRouter />;
};

export default App;
