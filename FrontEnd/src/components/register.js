import React, { useLayoutEffect, useState } from 'react';
import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import axios from "axios";


const Register = () => {
    const history = useHistory();
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [statusF, setStatusf] = useState("");

    const register = () => {
        const reg = { firstName: fname, lastName: lname, age: age, country: country, email: email, password: password };
        axios
            .post("http://localhost:5000/users", reg)
            .then((response) => {
                setStatus(true)
            })
            .catch((err) => {
                setStatusf(false)
                console.log(err);
            })
    }

    return (
        <>
            <div className="registerStyle">
                <p>Register :</p>
                <input className="inputStyle" type="text" placeholder="First Name here" onChange={(e) => {
                    setFName(e.target.value);
                }} /><br />
                <input className="inputStyle" type="text" placeholder="Last Name here" onChange={(e) => {
                    setLName(e.target.value);
                }} /><br />
                <input className="inputStyle" type="number" placeholder="Age here" onChange={(e) => {
                    setAge(e.target.value);
                }} /><br />
                <input className="inputStyle" type="text" placeholder="country here" onChange={(e) => {
                    setCountry(e.target.value);
                }} /><br />
                <input className="inputStyle" type="text" placeholder="email here" onChange={(e) => {
                    setEmail(e.target.value);
                }} /><br />
                <input className="inputStyle" type="password" placeholder="password here" onChange={(e) => {
                    setPassword(e.target.value);
                }} /><br />
                <button className="registerButton" onClick={register}>Register</button>
                <div>
                    {status ? <p className="successMessage">The user has been created successfully</p>
                        :"" }
                         {statusF ?<p className="failMessage"> Error happened while register, please try again</p>
                        :"" }
                </div>
            </div>
        </>
    );
};

export default Register

//<p className="failMessage"> Error happened while register, please try again</p>