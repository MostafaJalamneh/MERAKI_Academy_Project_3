import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <>
      {!props.pToken ? <div className="Navigation" style={{ display: 'flex', gap: '16px' }}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div> : ""}

      {props.pToken ? <div className="Navigation" style={{ display: 'flex', gap: '16px' }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/newArticle">NewArticle</Link>
      </div> : ""}
    </>
  );
};

export default Navigation