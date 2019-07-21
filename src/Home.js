import React, { Component } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Wardrobe from "./Wardrobe";
import OwnedItemPage from "./OwnedItemPage";
import { ItemDetailView } from "./views/ItemDetailView";
import NotFound from "./NotFound";
import Thread from "./Thread";
import SearchResults from "./components/SearchResults";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import searchStat from "./components/searchStat";

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
    console.log("Hiiiiiiiiii");
    console.log(this.satate.input_text);
  };
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          type="text/css"
          href="path/to/notifications.css"
        />
        <Header />
        <Menu triggerParentUpdate={this.Callback} />
        <div className="content-wrapper">
          {/* Content Header (Page header) */}

          {/* Main content */}
          <section className="content">
            <switch>
              <Route exact path="/home" component={Wardrobe} />
              <Route
                path="/home/wardrobe/ownedItem/:itemId"
                component={OwnedItemPage}
              />
              <Route path="/home/show/:id" component={ItemDetailView} />
              <Route path="/home/search/:query" component={SearchResults} />
              <Route path="/home/searchStat" component={searchStat} />
            </switch>

            {/* <Thread id="5d2a334af1ca4b48b6caaf85"/> */}
            {/* {this.state.show && (
              <SearchResults input_text={this.state.input_text} />
            )}
            <Wardrobe /> */}
          </section>
          <NotificationContainer />
          {/* /.content */}
        </div>
        <Footer />
        {/* /.content-wrapper */}
      </div>
    );
  }
}

export default Home;
