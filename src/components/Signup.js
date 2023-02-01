import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


export default function Signup(props) {
  const [cred, setCred] = useState({ name: "", email: "", password: "", Cpassword: "" })
  let navigate = useNavigate()


  const handleSubmit = async (e) => {
    if (cred.Cpassword !== cred.password) {
      props.funcAlert("Confirm password must be same", "danger");
    }
    else {
      e.preventDefault();
      const response = await fetch(`https://inotebook-backend-six.vercel.app/api/auth/createuser`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password })
      });

      const json = await response.json();
      if (json.success) {
        sessionStorage.setItem("token", json.authToken)
        props.funcAlert("Account created successfully", "success");
        navigate('/');
      }
      else {
        props.funcAlert("invalid", "danger");
      }
    }

  }

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" required minLength={5} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password" onChange={onChange} required minLength={5} />
        </div>

        <div className="mb-3">
          <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="Cpassword" id="Cpassword" onChange={onChange} required minLength={5} />
          <div id="emailHelp" className="form-text">Confirm Password must be same as password</div>
        </div>

        <button  type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
