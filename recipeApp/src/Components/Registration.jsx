import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:3001/auth/register", { username, password });
            navigate('/auth/login');
            console.log(result);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 border border-1 w-25'>
                <h3>Registration</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            placeholder='Enter Username' 
                            className='form-control'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder='Enter Password' 
                            className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='mt-1 btn btn-success w-100'>Submit</button>
                    <Link to="/auth/Login">
                        <button type='button' className='btn btn-default w-100 mt-2 border'>Login</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Registration;
