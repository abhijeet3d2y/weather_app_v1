import './login_and_register_component.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from './AuthService';

const LoginRegister = () => {
    const navigate = useNavigate();

    const [isToggled, setIsToggled] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
    };

    const toggleButton = () => {
        setIsToggled(!isToggled);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            if (!formData.username || !formData.password) {
                setError('Username and password are required.');
                return;
            }

            const response = await axios.post('/register', formData);
            // console.log('Registration successful:', response.data);
            setToken(response.data.token);
            navigate('/home');

        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please check your data and try again.');
            // Handle errors
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            if (!formData.username || !formData.password) {
                setError('Username and password are required.');
                return;
            }
            const response = await axios.post('/login', formData);
            console.log('Login successful:', response.data);
            setToken(response.data.token);
            navigate('/home');
            // Handle success
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your data and try again.');
            // Handle errors
        }
    };

    return (
        <div className="login-register-container">
            <button type="button" onClick={toggleButton} className={`btn btn-toggle ${isToggled ? 'active' : ''}`}>
                {isToggled ? 'Do you want to Register ? Tap Here' : 'Existing Customer - Do Login, Tap Here'}
            </button>
            {isToggled ? (
                <div className="login-register-form">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <br />
                    {error && <div className="error">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input value={formData.username} onChange={handleChange} name="username" type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input  value={formData.password} onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
                </div>
            ) : (
                <div className="login-register-form">
                <form onSubmit={handleRegister}>
                    <h1>Register</h1>
                    <br />
                    {error && <div className="error">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail2">Username</label>
                        <input value={formData.username} onChange={handleChange} name='username' type="text" className="form-control" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword2">Password</label>
                        <input value={formData.password} onChange={handleChange} name='password' type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
                </div>
            )}
        </div>
    );
};

export default LoginRegister;
