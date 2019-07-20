import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import Home from './Home'
import Register from './Register';


export default class App extends Component {
    render() {
        return (
            <Router>
        
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register}/>
              
          </Switch>
        
      </Router>
        );
    }
}
