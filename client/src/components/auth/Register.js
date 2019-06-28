import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className='card bg-primary text-center card-form'>
            <div className='card-body'>
                <h3>Register Now</h3>
                <p>Please fill out this form to register</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control form-control-lg'
                            placeholder='Name'
                            value={name}
                            name='name'
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control form-control-lg'
                            placeholder='Email Address'
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
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control form-control-lg'
                            placeholder='Confirm Password'
                            value={password2}
                            name='password2'
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <input
                        type='submit'
                        value='Register'
                        className='btn btn-outline-light btn-block'
                    />
                    <p className='mt-3'>
                        Already have an account ?{' '}
                        <Link className='text-light' to='/login'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);
