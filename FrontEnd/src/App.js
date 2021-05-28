import React ,{useState} from 'react';
import { Switch, Route, Link, useParams,Redirect, useHistory } from 'react-router-dom';
import Register from './components/register'
import Login from './components/login'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import './style.css'

// jsx
const App = () => {
  const [token, setToken] = useState();
  console.log("Token :: ", token);
  return (
    <>
      <div className="mainStyle">
        <Navigation />
        <Route exact path="/login" render={() => <Login setToken={setToken} />} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />

      </div>
    </>
  )
};


export default App