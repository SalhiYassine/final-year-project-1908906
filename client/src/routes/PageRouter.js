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
import CourseDetails from '../pages/Organisation/CourseDetails'
import SessionCreate from '../pages/Organisation/sessionCreate';
import Header from '../components/Header';
import Loader from '../components/Loader';

const PageRouter = () => {
  const { authenticated, admin, loading } = useSelector((state) => state.userLogin);

  if (!loading && admin && authenticated) {
    return (
      <Router>
        <Header />
        <Container>
          <Switch>
            <AdminRoute isAuthenticated={authenticated} isAdmin={admin} exact path='/session/create' component={SessionCreate} />
            <AdminRoute isAuthenticated={authenticated} isAdmin={admin} exact path='/course/create' component={CourseCreate} />
            {/* course details */}
            <AdminRoute isAuthenticated={authenticated} isAdmin={admin} path='/course/:id' component={CourseDetails} />
            <AdminRoute isAuthenticated={authenticated} isAdmin={admin} exact path={['/', '*']} component={OrganisationPanel} />


            {/* All */}
            <h2>Working PageRouter</h2>
          </Switch>
        </Container>
      </Router>
    );
  } else if (!loading && authenticated && !admin) {

    return (
      <Router>
        <Header />
        <Container>
          <Switch>
            {/* Participant */}

            <h2>Working PageRouter</h2>
          </Switch>
        </Container>
      </Router>
    );
  } else {
    return (
      <Router>
        <Header />
        <Container>
          <Switch>
            {/* Participant */}
            <PublicRoute path='/organisation/register' isAuthenticated={authenticated} exact component={OrganisationRegister} />
            <PublicRoute path='/organisation/login' isAuthenticated={authenticated} exact component={OrganisationLogin} />
            <PublicRoute path='/participant/register' isAuthenticated={authenticated} component={UserRegister} />
            <PublicRoute path='/participant/login' isAuthenticated={authenticated} component={UserLogin} />
            {/* All */}
            <h2>Working PageRouter</h2>
          </Switch>
        </Container>
      </Router>
    )
  }
};

export default PageRouter;
