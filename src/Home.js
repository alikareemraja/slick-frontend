import React, { Component } from 'react';
import Header from './Header';
import Menu from './Menu';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Wardrobe from './Wardrobe';
import OwnedItemPage from './OwnedItemPage';
import { ItemListView } from './views/ItemListView';
import { ItemDetailView }   from './views/ItemDetailView';
import NotFound from './NotFound';
import Thread from './Thread';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_text: "",
      show: false
    };
  }
  //callbackFromParent
  Callback = dataFromMenu => {
    this.setState({ input_text: dataFromMenu, show: true });
  };
  render() {
    return (
      <div>
        <Header />
        <Menu triggerParentUpdate={this.Callback} />
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>
              Wardrobe
              <small>your custom choice</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="no_url">
                  <i className="fa fa-dashboard" /> Home
                </a>
              </li>
              <li className="active">Home page</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            <switch>
              <Route exact path='/' component={Wardrobe} />
              <Route exact path='/thread' component={Thread} />
              <Route exact path='/wardrobe/ownedItem/:itemId' component={OwnedItemPage} /> 
              <Route exact path='/item' component={ItemListView} />
              <Route exact path='/show/:id' component={ItemDetailView} /> 
            </switch>
          
            {/* <Thread id="5d2a334af1ca4b48b6caaf85"/> */}
            {/* {this.state.show && (
              <SearchResults input_text={this.state.input_text} />
            )}
            <Wardrobe /> */}
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
                

    
            </div>
        );
    }
}

export default Home;
