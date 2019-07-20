import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import Home from './Home'
import Register from './Register';


export default class App extends Component {
    
    constructor(props) {
        super(props);
        var location = window.location.pathname;
        if(location === "/"){
            window.location.href = '/home'; 
        }
      }

    render() {
        return (
            <Router>
        
          <Switch>
              <Route path='/home' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register}/>
              
          </Switch>
        
      </Router>
        );
    }
}
