import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { logOut } from '../redux/actions/userAction';
import { logOutOrg } from '../redux/actions/organisationAction';

import { useDispatch } from 'react-redux';

const Header = () => {
    const { authenticated, admin } = useSelector((state) => state.userLogin);
    const { userDetails } = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();
    const logOutHandler = () => {
        dispatch(logOut());
    };

    const orgLogOutHnadler = () => {
        dispatch(logOutOrg())
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        {admin ?
                            <Navbar.Brand>Organisation Panel</Navbar.Brand> :

                            authenticated ? <Navbar.Brand>Participant Panel</Navbar.Brand> :
                                <Navbar.Brand>Landing Panel</Navbar.Brand>
                        }
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>


                            {/* User Admin : */}


                            {/* User Logged In : */}
                            {authenticated && (
                                <>
                                    {!admin &&
                                        <>
                                            <LinkContainer exact to='/'>
                                                <Nav.Link>
                                                    <i className='fas fa-book'></i> Upcoming
                                                </Nav.Link>
                                            </LinkContainer>

                                            <LinkContainer to='/attendance'>
                                                <Nav.Link>
                                                    <i className='fas fa-history'></i> History
                                                </Nav.Link>
                                            </LinkContainer>
                                        </>
                                    }
                                    <NavDropdown
                                        className='m-0'
                                        title={userDetails.email}
                                        id='username'>
                                        <LinkContainer to='/profile' as='div' className='me-3'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={!admin ? logOutHandler : orgLogOutHnadler}>
                                            Log Out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            )}

                            {/* User NOT Logged In : */}
                            {!authenticated && (
                                <>
                                    <LinkContainer to='/participant/login'>
                                        <Nav.Link>
                                            <i className='fas fa-user'></i> Participant Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/organisation/login'>
                                        <Nav.Link>
                                            <i className='fas fa-user'></i> Organisation Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;