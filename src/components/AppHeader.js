import React, { useState } from 'react';

// External Imports
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { useHistory } from 'react-router-dom';
import { SiHotelsDotCom, SiDash } from 'react-icons/si';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { FaRegistered } from 'react-icons/fa';

const AppHeader = () => {

    // Getting Instance of Browser History
    const history = useHistory();
    const dispatch = useDispatch();

    // Getting The User State From Redux
    const authenticatedUser = useSelector(state => state.auth);

    // Navbar Toggler Function
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // Overwriting The Link Styles
    const linkStyle = {
        color: "#fff",
        margin: "0 20px"
    }

    // Creating Logoff Function Here
    const logOff = () => {
        dispatch(logout(() => history.push("/")));
    };

    // Navbar For Already Signed Users
    const SIGNED_USERS = () => {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/"><SiHotelsDotCom />otelly</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/dashboard">
                                <Button color="info" className="mr-3 my-3 my-md-0"><SiDash />ashboard</Button>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <Button onClick={logOff} color="danger"><FiLogOut /> Log Off</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }

    // Navbar For Non-Signed Users
    const NON_SIGNED_USERS = () => {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/"><SiHotelsDotCom />otelly</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/reg" style={linkStyle}><FaRegistered /> Register</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/login" style={linkStyle}><FiLogIn /> Login</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }

    return (
        authenticatedUser ? SIGNED_USERS() : NON_SIGNED_USERS()
    )
}

export default AppHeader;
