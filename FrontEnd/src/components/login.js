import React, { useLayoutEffect, useState } from 'react';
import axios from "axios";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const logi = { loginEmail: loginEmail, loginPassword: loginPassword };

  const login = () => {
    axios
      .post("http://localhost:5000/login", logi)
      .then((response) => { 
        
      })
      .catch((err) => { console.log(err); })
  }
  return (
    <>
      <div className="loginStyle">
        <p>Login :</p>
        <input className="inputStyle" type="text" placeholder="email here" onChange={(e) => {
          setLoginEmail(e.target.value);
        }} /><br />
        <input className="inputStyle" type="password" placeholder="password here" onChange={(e) => {
          setLoginPassword(e.target.value);
        }} /><br />
        <button className="registerButton" onClick={login}>Login</button>
      </div>
    </>
  )
};

export default Login