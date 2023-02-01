import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {

    const [cred, setCred] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://inotebook-backend-six.vercel.app/api/auth/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const json = await response.json();

        if (json.success) {
            //save the authtoken and redirect
            sessionStorage.setItem("token", json.authToken)
            props.funcAlert("logged in", "success");
            navigate('/')
        }
        else {
            props.funcAlert("invalid details", "danger");
        }
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} value={cred.email} type="email" className="form-control" id="emai1" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwword" className="form-label">Password</label>
                    <input onChange={onChange} value={cred.password} type="password" className="form-control" id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
