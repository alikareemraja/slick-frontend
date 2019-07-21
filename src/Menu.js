import React, { Component } from "react";
import axios from "axios";
//import SearchResults from "./components/SearchResults";
import HttpService from "./HttpService";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
const AddEndPoint = "http://localhost:3001/search/addstat";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      input_text: "",
      search_text: "",
      show: false
    };
  }

  onChangeSearchInput(e) {
    this.setState({
      input_text: e.target.value
    });
  }
  onSubmit(e) {
    //called when the user submits the form
    e.preventDefault(); //prevent browser's default behavior
    // this.props.search_text = this.state.input_text; // make the call to back-end, passing the url of the back-end end point
    if (this.state.input_text) {
      if (this.state.input_text != this.search_text) {
        this.search_text = this.state.input_text;

        //this.props.history.push("/home/search/" + this.search_text);
        //  this.props.triggerParentUpdate(this.search_text);
        this.setState({ show: true });
        var time = new Date();
        const search_item = {
          searchItem: this.search_text,
          Date: time
        };
        console.log("Posting to search statistics");
        console.log(search_item);

        HttpService.post(
          AddEndPoint,
          search_item,
          function(data) {},
          function(textStatus) {
            console.log(textStatus);
          }
        );
        window.location.href = "/home/search/" + this.search_text;
      }
    } else NotificationManager.info("Cant perform emtpy search!");
  }

  render() {
    return (
      <aside className="main-sidebar">
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar">
          {/* Sidebar user panel */}
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src={this.props.userImgSrc}
                className="img-circle"
                alt="User"
              />
            </div>
            <div className="pull-left info">
              <p>{this.props.userFullName}</p>
              <a href="fake_url">
                <i className="fa fa-circle text-success" /> Online
              </a>
            </div>
          </div>
          {/* search form */}
          <form
            action="#"
            method="get"
            className="sidebar-form"
            onSubmit={this.onSubmit}
          >
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                value={this.props.input_text} /**{this.state.input_text} */
                onChange={this.onChangeSearchInput}
                placeholder="Search..."
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  name="search"
                  id="search-btn"
                  className="btn btn-flat"
                  onClick={this.onSubmit}
                >
                  <i className="fa fa-search" />
                </button>
                {/*  React.cloneElement(this.props.children, input_text : "UUU")
                 */}
              </span>
            </div>
          </form>
          {/* /.search form */}
          {/* sidebar menu: : style can be found in sidebar.less */}
          <ul className="sidebar-menu" data-widget="tree">
            <li>
              <a href="/">
                <i className="fa fa-shirtsinbulk" /> <span>Wardrobe</span>
                <span className="pull-right-container">
                  {/* <small className="label pull-right bg-green">new</small> */}
                </span>
              </a>
            </li>

            <li>
              <a href="/">
                <i className="fa fa-umbrella" /> <span>Owned Items</span>
                <span className="pull-right-container">
                  {/* <small className="label pull-right bg-green">new</small> */}
                </span>
              </a>
            </li>

            <li>
              <a href="/">
                <i className="fa fa-angellist" /> <span>Wishlist</span>
                <span className="pull-right-container">
                  {/* <small className="label pull-right bg-green">new</small> */}
                </span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa fa-user-circle" /> <span>Friends</span>
                <span className="pull-right-container">
                  {/* <small className="label pull-right bg-green">new</small> */}
                </span>
              </a>
            </li>
          </ul>
        </section>
        {/* /.sidebar */}
        <section />
      </aside>
    );
  }
}
