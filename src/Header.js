import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import Logout from './Logout';
// import Login from './Login';
import { withAuth0 } from '@auth0/auth0-react';

class Header extends React.Component {
  render() {
    const {isAuthenticated}= this.props.auth0;
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Link to="/">Home</Link>
        <Link to="/FavDrinks">Fav Drinks</Link>

        { isAuthenticated ? <Logout/> : null }
      </Navbar>
    );
  }
}

export default withAuth0 (Header);
