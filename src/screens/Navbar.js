import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const handleLogout=()=>{
        localStorage.clear();
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary "style={{background:"lightgrey"}}>
  <div className="container-fluid">
    
   
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
      {(!localStorage.getItem("token"))?
        <>
        <li className="nav-item">
            
          <Link className="nav-link " style={{color:"black"}} aria-current="page" to="./login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={{color:"black"}} to="./signup">Sign Up</Link>
        </li>
        </>:
        <li className="nav-item">
          <div className="nav-link" style={{color:"black", cursor:"pointer"} } onClick={handleLogout} >LogOut</div>
        </li>
       }
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
