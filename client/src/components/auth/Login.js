import React, { useState } from 'react'
// Import the login function
import { login } from '../../api/auth/authService'; // Adjust the path as necessary

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        login(email, password)
        .then(res => {
            console.log(res);
            // Handle success - e.g., navigate to dashboard, store the token, etc.
        })
        .catch(err => {
            console.log(err);
            // Handle error - e.g., show an error message
        });
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter email" className='form-control'
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" className='form-control'
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className='btn btn-success'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;