import React from 'react';
import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import Register from './components/register'
import Login from './components/login'
import Navigation from './components/Navigation'
import './style.css'

// jsx
const App = () => {
  return (
    <>
      <div className="mainStyle">
        <Navigation />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    </>
  )
};


export default App