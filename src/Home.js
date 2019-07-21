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
import UserService from "./UserService";

class Home extends Component {
  constructor(props) {
    super(props);

    UserService.getCurrentUserInfo().then((data) => {
      console.log("Curent User Info: ");
      console.log(data);
      this.setState({
        userFullName: data[0].name,
        userImgSrc: data[0].imageURL
      });
    })

    this.state = {
      input_text: "",
      show: false
    };
  }
  //callbackFromParent
  Callback = dataFromMenu => {
    this.setState({ input_text: dataFromMenu, show: true });
    console.log("Hiiiiiiiiii");
    console.log(this.state.input_text);
  };

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          type="text/css"
          href="path/to/notifications.css"
        />
        <Header userFullName={this.state.userFullName} userImgSrc={this.state.userImgSrc} />
        <Menu triggerParentUpdate={this.Callback} userFullName={this.state.userFullName} userImgSrc={this.state.userImgSrc} />
        <div className="content-wrapper">
          {/* Content Header (Page header) */}

          {/* Main content */}
          <section className="content">
            <switch>
              <Route exact path="/home" render={(props) => <Wardrobe userId={UserService.getCurrentUser().id} />} />
              <Route exact path="/home/user/:uid" component={Wardrobe} />
              <Route path="/home/user/:uid/ownedItem/:itemId" component={OwnedItemPage} />
              <Route path="/home/show/:id" component={ItemDetailView} />
              <Route path="/home/search/:query" component={SearchResults} />
              <Route path="/home/searchStat" component={searchStat} />
            </switch>

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
