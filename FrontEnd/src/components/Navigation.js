import React from 'react';
import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom';

const Navigation = () => {
    return (
      <div className="navigation" style={{ display: "flex", gap: "16px" }}>
        <Link to="/login"> Login </Link>
        <Link to="/register"> Register </Link>
      </div>
    );
  };

  export default Navigation