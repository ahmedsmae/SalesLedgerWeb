import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
    <header id='home-section'>
        <div className='back-img'>
            <div className='dark-overlay'>
                <div className='container padding-nav'>
                    <h1 className='display-3'>SalesLedger 2 for Web</h1>
                    <p className='lead'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Asperiores dicta suscipit recusandae eum provident
                        blanditiis.
                    </p>
                    <div className='d-flex'>
                        <div className='p-4 align-self-start'>
                            <i className='fas fa-check fa-2x' />
                        </div>
                        <div className='p-4 align-self-end'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Sed, tempore iusto in minima facere dolorem!
                        </div>
                    </div>

                    <div className='d-flex'>
                        <div className='p-4 align-self-start'>
                            <i className='fas fa-check fa-2x' />
                        </div>
                        <div className='p-4 align-self-end'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Sed, tempore iusto in minima facere dolorem!
                        </div>
                    </div>

                    <div className='d-flex'>
                        <div className='p-4 align-self-start'>
                            <i className='fas fa-check fa-2x' />
                        </div>
                        <div className='p-4 align-self-end'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Sed, tempore iusto in minima facere dolorem!
                        </div>
                    </div>

                    <div className='buttons'>
                        <Link to='/login' className='btn btn-primary m-2'>
                            Login
                        </Link>
                        <Link to='/register' className='btn btn-primary m-2'>
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default Landing;
