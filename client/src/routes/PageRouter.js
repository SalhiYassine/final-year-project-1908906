import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Custom Routing
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AdminRoute from './AdminRoute';
import { Container } from 'react-bootstrap';

// Components
import OrganisationRegister from '../pages/Organisation/OrganisationRegister'
import UserRegister from '../pages/Participant/UserRegister'
import UserLogin from '../pages/Participant/UserLogin'
import OrganisationLogin from '../pages/Organisation/OrganisationLogin'
import CourseCreate from '../pages/Organisation/CourseCreate';

const PageRouter = () => {
  const { authenticated, admin } = useSelector((state) => state.userLogin);
  return (
    <Router>
      <Container>
        <Switch>
          {/* Org */}
          <PublicRoute path='/organisation/register' isAuthenticated={authenticated} component={OrganisationRegister} />
          <PublicRoute path='/organisation/login' isAuthenticated={authenticated} component={OrganisationLogin} />
          <AdminRoute isAuthenticated={authenticated} isAdmin={admin} path='/organisation/course/create' component={CourseCreate} />
          {/* Participant */}
          <PublicRoute path='/participant/register' isAuthenticated={authenticated} component={UserRegister} />
          <PublicRoute path='/participant/login' isAuthenticated={authenticated} component={UserLogin} />
          {/* All */}
          <h2>Working PageRouter</h2>
        </Switch>
      </Container>
    </Router>
  );
};

export default PageRouter;
