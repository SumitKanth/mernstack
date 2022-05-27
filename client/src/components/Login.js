import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import loginpic from '../images/login.svg';

import {UserContext} from '../App';

const Login = () => {

    const {state, dispatch} = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        // Actually fetch api returns data in json format, so to use it in your code you have to convert it to object,
        // json() is method that converts json data to ja object.
        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        if(res.status === 404 || !data){
            alert('Invalid Credientials');
            console.log('Invalid Credientials');
        }
        else{
            dispatch({type:"USER", payload:true});
            alert('Logined Successfully');
            console.log('Logined Successfully');
            navigate('/');
        }

    }

    return(
        <>
        <section className='sign-in'>
            <div className='container mt-5'>
                <div className='signin-content'>

                <div className='signin-image'>
                        <figure>
                            <img src={loginpic} alt="img" />
                        </figure>
                        <NavLink to="/signup" className="signup-image-link">Create an Account</NavLink>
                    </div>

                <div className="signin-form">

                    <h2 className="form-title">Sign up</h2>
                    <form method='POST' className='register-form' id='register-form'>

                        <div className='form-group'>
                            <label htmlFor="email">
                            <i class="zmdi zmdi-account material-icons-email"></i>
                            </label>
                            <input type="email" name='email' id='email' autoComplete='off' placeholder='Your Email' 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="password">
                            <i class="zmdi zmdi-lock material-icons-name"></i>
                            </label>
                            <input type="password" name='password' id='password' autoComplete='off' placeholder='Your Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='form-group form-button'>
                            <input type="submit" name='signin' id='signin' className='form-submit' value="Log in"
                            onClick={loginUser}
                            />
                        </div>

                    </form>

                </div>
                    
                </div>
            </div>
        </section>
        </>
    );
}

export default Login