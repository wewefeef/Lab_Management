import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../API/axios'; // Thêm dòng này

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Register component mounted');
    }, []);

    const register = async (e) => {
        e.preventDefault();
        setError('');

        // Validate all required fields
        if (!username || !password || !email || !phone || !fullName) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Email không đúng định dạng (ví dụ: user@example.com).');
            return;
        }

        // Validate phone number (10 digits)
        if (!/^\d{10}$/.test(phone)) {
            setError('Số điện thoại phải có 10 chữ số.');
            return;
        }

        // Validate password length (minimum 6 characters)
        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }

        const payload = {
            username,
            password,
            email,
            phone: phone.toString(),
            fullName
        };
        console.log('Payload:', payload);

        try {
            const response = await instance.post('/register', payload);
            const data = response.data;

            // Lưu thông tin user vào localStorage sau khi đăng ký thành công
            localStorage.setItem('user', JSON.stringify(data.user));
            // Tự động chuyển sang trang login với username và password vừa đăng ký
            navigate('/login', { state: { username, password } });
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error === 'Email already exists') {
                setError('Email đã tồn tại, vui lòng chọn email khác.');
            } else {
                setError(err.response?.data?.error || err.message || 'Registration failed');
            }
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                                        <p className="text-center small">Enter your personal details to create account</p>
                                    </div>
                                    <form className="row g-3 needs-validation" onSubmit={register}>
                                        <div className="col-12">
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" required />
                                            <div className="invalid-feedback">Please enter a username!</div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="fullName" className="form-label">Full Name</label>
                                            <input type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" id="fullName" required />
                                            <div className="invalid-feedback">Please enter your full name!</div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" required />
                                            <div className="invalid-feedback">Please enter a valid email!</div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="phone" className="form-label">Phone</label>
                                            <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="phone" required />
                                            <div className="invalid-feedback">Please enter a valid phone number!</div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" required />
                                            <div className="invalid-feedback">Please enter a password!</div>
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
                                            <p className="small mb-0 text-center">Already have an account? <Link to="/login">Login</Link></p>
                                        </div>
                                    </form>
                                    {error && <p className="text-danger text-center">{error}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};