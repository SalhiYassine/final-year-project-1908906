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
import OrganisationPanel from '../pages/Organisation/OrganisationPanel'
import UserRegister from '../pages/Participant/UserRegister'
import UserLogin from '../pages/Participant/UserLogin'
import OrganisationLogin from '../pages/Organisation/OrganisationLogin'
import CourseCreate from '../pages/Organisation/CourseCreate';
import SessionCreate from '../pages/Organisation/sessionCreate';

const PageRouter = () => {
  const { authenticated, admin } = useSelector((state) => state.userLogin);
  return (
    <Router>
      <Container>
        <Switch>
          {/* Org */}
          <PublicRoute path='/organisation/register' isAuthenticated={authenticated} component={OrganisationRegister} />
          <PublicRoute path='/organisation/login' isAuthenticated={authenticated} component={OrganisationLogin} />
          <AdminRoute isAuthenticated={authenticated} isAdmin={admin} path='/organisation/session/create' component={SessionCreate} />
          <AdminRoute isAuthenticated={authenticated} isAdmin={admin} path='/organisation/course/create' component={CourseCreate} />
          <AdminRoute isAuthenticated={authenticated} isAdmin={admin} path='/organisation/course/:id' component={SessionCreate} />

          <AdminRoute isAuthenticated={authenticated} isAdmin={admin} path='/organisation' component={OrganisationPanel} />
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
