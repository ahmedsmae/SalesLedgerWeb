import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect if loged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className='card bg-primary text-center card-form'>
            <div className='card-body'>
                <h3>Login</h3>
                <p>Please fill out this form to login</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control form-control-lg'
                            placeholder='Email'
                            value={email}
                            name='email'
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control form-control-lg'
                            placeholder='Password'
                            value={password}
                            name='password'
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <input
                        type='submit'
                        value='Login'
                        className='btn btn-outline-light btn-block'
                    />
                    <p className='mt-3'>
                        Don't have account yet ?{' '}
                        <Link className='text-light' to='/register'>
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { login }
)(Login);
