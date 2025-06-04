import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';

export const Register = () => {
    const [uname, setuname] = useState('');
    const [umobile, setumobile] = useState('');
    const [uemail, setuemail] = useState('');
    const [upass, setupass] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Register component mounted');
        // Temporarily disabled redirect for testing
        // const currentPath = window.location.pathname;
        // if (currentPath === '/register' && localStorage.getItem('uemail') !== null && localStorage.getItem('uemail') !== '') {
        //     navigate('/login');
        // }
    }, [navigate]);

    const register = (e) => {
        e.preventDefault();
        localStorage.setItem('uname', uname);
        localStorage.setItem('umobile', umobile);
        localStorage.setItem('uemail', uemail);
        localStorage.setItem('upass', upass);
        alert(uname + ' : ' + umobile + ' : ' + uemail + ' : ' + upass + ' | Register Successful!');
        navigate('/login');
    };

    return (
        <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">
                                <Link to="/" className="logo d-flex align-items-center w-auto">
                                    <img src={logo} alt="" />
                                    <span className="d-none d-lg-block">MohitBhavsar</span>
                                </Link>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                                        <p className="text-center small">Enter your personal details to create account</p>
                                    </div>
                                    <form className="row g-3 needs-validation" onSubmit={register}>
                                        <div className="col-12">
                                            <label htmlFor="yourName" className="form-label">Your Name</label>
                                            <input type="text" name="name" value={uname} onChange={(e) => setuname(e.target.value)} className="form-control" id="yourName" required />
                                            <div className="invalid-feedback">Please, enter your name!</div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="yourMobile" className="form-label">Your Mobile</label>
                                            <input type="number" name="mobile" value={umobile} onChange={(e) => setumobile(e.target.value)} className="form-control" id="yourMobile" required />
                                            <div className="invalid-feedback">Please enter a valid Mobile address!</div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="yourEmail" className="form-label">Email</label>
                                            <div className="input-group has-validation">
                                                <input type="text" name="email" value={uemail} onChange={(e) => setuemail(e.target.value)} className="form-control" id="yourEmail" required />
                                                <div className="invalid-feedback">Please choose a Email.</div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="yourPassword" className="form-label">Password</label>
                                            <input type="password" name="password" value={upass} onChange={(e) => setupass(e.target.value)} className="form-control" id="yourPassword" required />
                                            <div className="invalid-feedback">Please enter your password!</div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required />
                                                <label className="form-check-label" htmlFor="acceptTerms">I agree and accept the <Link to="#">terms and conditions</Link></label>
                                                <div className="invalid-feedback">You must agree before submitting.</div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100" type="submit">Create Account</button>
                                        </div>
                                        <div className="col-12">
                                            <p className="small mb-0">Already have an account? <Link to="/login">Login</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="credits">Copyright © MohitBhavsar</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};