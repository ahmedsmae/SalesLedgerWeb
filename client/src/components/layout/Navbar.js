import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
                <a href='#!' className='nav-link' onClick={logout}>
                    Logout
                </a>
            </li>
            <li className='nav-item'>
                <Link to='/about' className='nav-link'>
                    About
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/contact' className='nav-link'>
                    Contact
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
                <Link to='/register' className='nav-link'>
                    Register
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/login' className='nav-link'>
                    Login
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/about' className='nav-link'>
                    About
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/contact' className='nav-link'>
                    Contact
                </Link>
            </li>
        </ul>
    );

    return (
        <nav
            className='navbar navbar-expand-sm bg-dark navbar-dark fixed-top'
            id='main-nav'
        >
            <div className='container'>
                <Link to='/' className='navbar-brand'>
                    SalesLedger Web
                </Link>
                {!loading && (
                    <Fragment>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Fragment>
                )}
                {/* <div className='collapse navbar-collapse' id='navbarCollapse' /> */}
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(Navbar);
