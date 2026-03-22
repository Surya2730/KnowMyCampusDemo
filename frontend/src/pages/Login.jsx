import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Auth.css';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ setUserInfo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showDemo, setShowDemo] = useState(true);

    const fillDemo = (role) => {
        if (role === 'faculty') {
            setEmail('suryaselvam.219@gmail.com');
            setPassword('surya123');
        } else {
            setEmail('karthiselvam.2730@gmail.com');
            setPassword('karthi123');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUserInfo(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    const handleGoogleSuccess = async (response) => {
        try {
            const { data } = await api.post('/auth/google', { token: response.credential });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUserInfo(data);
            navigate('/');
        } catch (err) {
            setError('Google Login Failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="card auth-card">
                <center>
                    <img src="/BannariAmman_logo.png" alt="College Logo" style={{ height: '100px', marginBottom: '15px' }} />
                </center>
                <h2>Welcome to KnowMyCampus</h2>
                {error && <div className="error-msg">{error}</div>}

                {showDemo && (
                    <div className="demo-credentials" style={{
                        background: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        border: '1px dashed #007bff',
                        fontSize: '0.85rem'
                    }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#007bff', display: 'flex', justifyContent: 'space-between' }}>
                            Demo Credentials
                            <span style={{ cursor: 'pointer', color: '#999' }} onClick={() => setShowDemo(false)}>×</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div 
                                onClick={() => fillDemo('faculty')}
                                style={{
                                    padding: '8px',
                                    background: '#fff',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.borderColor = '#007bff'}
                                onMouseOut={(e) => e.currentTarget.style.borderColor = '#ddd'}
                            >
                                <strong>Faculty/HR</strong><br/>
                                <span style={{ color: '#666' }}>Click to auto-fill</span>
                            </div>
                            <div 
                                onClick={() => fillDemo('student')}
                                style={{
                                    padding: '8px',
                                    background: '#fff',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.borderColor = '#28a745'}
                                onMouseOut={(e) => e.currentTarget.style.borderColor = '#ddd'}
                            >
                                <strong>Student</strong><br/>
                                <span style={{ color: '#666' }}>Click to auto-fill</span>
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError('Google Login Failed')}
                    />
                </div>

                <div style={{ textAlign: 'center', margin: '15px 0', color: '#888', position: 'relative' }}>
                    <span style={{ background: '#fff', padding: '0 10px', position: 'relative', zIndex: 1 }}>OR</span>
                    <hr style={{ position: 'absolute', top: '50%', width: '100%', border: '0', borderTop: '1px solid #eee' }} />
                </div>

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Sign In</button>
                </form>

                {/* <div className="auth-footer" style={{ marginTop: '20px', fontSize: '0.9rem', color: '#777' }}>
                    Registration is disabled. Sign in with Google to auto-create an account.
                </div> */}
            </div>
        </div>
    );
};

export default Login;
