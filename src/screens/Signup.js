import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
export default function Signup() {
  
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit= async(e)=>{
      e.preventDefault();
      const response = await axios.post('http://localhost:5000/api/programs/signup', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
     if(response.data.success){
        localStorage.setItem('userEmail', credentials.email)
        localStorage.setItem('token', response.data.authToken)
        navigate("/");
     }
   
    else {
      alert( alert(response.data.error));
    }
  }
  return (
    <div >
     

    <div className='container' >
      <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
        <div className="m-3">
          <label htmlFor="name" className="form-label" style={{color:"white"}}>Name</label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="m-3">
          <label htmlFor="email" className="form-label" style={{color:"white"}}>Email address</label>
          <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
        </div>
        
      
        <div className="m-3">
          <label htmlFor="exampleInputPassword1" className="form-label"style={{color:"white"}}>Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
      </form>
    </div>
  </div>
  )
}