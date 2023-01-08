import React, {useState, useContext} from 'react';
import loginpic from "../images/Data_security_05.jpg";
import {NavLink} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail]= useState("");
  const [password, setPassword]=useState("");

  const loginUser= async(e)=>{
    e.preventDefault();

    const res=await fetch('/signin', {
      method:"POST",
      // mode: 'no-cors',
      credentials: 'include',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });

    const data=await res.json();

    if(res.status===400 || !data){
      window.alert("Invalid Credentials");
    }else{
      dispatch({ type: 'USER', payload: true });
      window.alert("Login Successful");
      navigate("../", { replace: true });
    }
  }
  return (
    <>
      <section className='sign-in'>
      <div className='container mt-5'>
        <div className='signin-content'>
        <div className='signin-image'>
              <figure>
                <img src={loginpic} alt='login-pic'/>
              </figure>
              <NavLink to="/signup" className="signup-image-link">Create an Account.</NavLink>
        </div>
          <div className='signin-form'>
            <h2 className='form-title'>Login</h2>
            <form method="POST" className='register-form' id='register-form'>
              

              <div className='form-group'>
                <label htmlFor='email'>
                  <i className='smdi zmdi-email material-icons-name'></i>
                </label>
                <input type="email" name="email" id="email" autoComplete="off" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your Email"></input>
              </div>

              

          
              <div className='form-group'>
                <label htmlFor='password'>
                  <i className='smdi zmdi-lock material-icons-name'></i>
                </label>
                <input type="password" name="password" id="password" autoComplete="off"  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Your Password"></input>
              </div>

              

              <div className='form-group form-button'>
                <input type="submit" name="signin" id="signin" className='form-submit' value="Log In" onClick={loginUser}/>
              </div>
            </form>
          </div>
            
        </div>
        
      </div>
    </section>
    </>
  )
}

export default Login
