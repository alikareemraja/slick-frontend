import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import Home from './Home'
import Register from './Register';
import { ItemListView } from './views/ItemListView';
import { ItemDetailView }   from './views/ItemDetailView';


export default class App extends Component {
    render() {
        return (
            <Router>
        
          <Switch>
              <Route path='/app' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register}/>
          </Switch>
        
      </Router>
        );
    }
}
