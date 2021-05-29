import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';


const Login = ({ setToken }) => {
  const history = useHistory();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const logi = { loginEmail: loginEmail, loginPassword: loginPassword };
  const [status, setStatus] = useState("");
  const [statusF, setStatusf] = useState("");

  const login = () => {
    axios
      .post('http://localhost:5000/login', logi)
      .then((response) => {
        setToken(response.data.token);
        history.push("/newArticle")
      })
      .catch((err) => {
        console.log(err);
      })
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
      { /* <div>
        {status ? <p className="failMessage"> The email doesn't exist</p>
          : ""}
        {statusF ? <p className="failMessage"> The password you've entered is incorrect</p>
          : ""}
    </div>*/}
    </>
  )
};

export default Login