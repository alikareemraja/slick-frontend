import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import axios from "axios";
import "../DispFormat.css";
import searchStat from "./searchStat";
import UserService from "../UserService";
import HttpService from "../HttpService";
import { NotificationContainer,NotificationManager } from "react-notifications";

const SearchEndPoint = "http://localhost:3001/search/get";
const StatisticsEndPoint = "http://localhost:3001/search/stat";
const buttonSize = { minHeight: "50px" };
class SearchResults extends Component {
  constructor(props) {
    // the constructor is to set the initial state of results
    UserService.getWishlistItems(UserService.getCurrentUser().id).then(data => {
      this.setState({
        wishlistItems: data
      });
    });

    super(props);
    this.itemList = this.itemList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
    this.state = {
      results: [], //empty array of results properties
      wishlistItems: [],
      number: 0,
      DisabledDictionary: {}
    };
  }
  componentWillMount() {
    var url = SearchEndPoint + "?category=" + this.props.match.params.query;
    // user authentication using token
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }
    //fetching results from search end point
    fetch(url, { headers: header })
      .then(res => res.json())
      .then(response => {
        this.setState({ results: response });
        response.map(item => (this.state.DisabledDictionary[item._id] = false));
        this.state.wishlistItems.map(
          item => (this.state.DisabledDictionary[item._id] = true)
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    var url = SearchEndPoint + "?category=" + this.props.match.params.query;
    // user authentication using token
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }
    //fetching results from search end point
    fetch(url, { headers: header })
      .then(res => res.json())
      .then(response => {
        this.setState({ results: response });
        response.map(item => (this.state.DisabledDictionary[item._id] = false));
        this.state.wishlistItems.map(
          item => (this.state.DisabledDictionary[item._id] = true)
        );
      })
      .catch(function(error) {
        console.log(error);
      });
    //fetching statistics data from statistics end point
    fetch(StatisticsEndPoint, { headers: header }) // no data sent with GET
      .then(res => res.json())
      .then(response => {
        this.setState({ number: response.length });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    //comparing props before triggering an update
    if (prevProps.input_text !== this.props.input_text) {
      // user authentication using token
      let token = window.localStorage["jwtToken"];
      let header = new Headers();
      if (token) {
        header.append("Authorization", `JWT ${token}`);
      }
      //fetching results from search end point
      var url = SearchEndPoint + "?category=" + this.props.match.params.query;
      fetch(url, { headers: header })
        .then(res => res.json())
        .then(response => {
          this.setState({ results: response });
          response.map(
            item => (this.state.DisabledDictionary[item._id] = false)
          );
          this.state.wishlistItems.map(
            item => (this.state.DisabledDictionary[item._id] = true)
          );
        })
        .catch(function(error) {
          console.log(error);
        });
      //fetching statistics data from statistics end point
      fetch(StatisticsEndPoint, { headers: header }) // no data sent with GET
        .then(res => res.json())
        .then(response => {
          this.setState({ number: response.length });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  handleSubmit = () => {
    window.location.href = "/home/searchStat";
  };

  addDefaultSrc(ev) {
    ev.target.src =
      "http://icons.iconarchive.com/icons/iconsmind/outline/256/T-Shirt-icon.png";
  }

  itemList() {
    return this.state.results.map((currentItem, i) => {
      // lowest price calculations
      let itemPriceList = currentItem.retailers,
        priceList = [];
      itemPriceList.map((p, i) => {
        priceList.push(itemPriceList[i]["price"]);
      });
      let lowestPrice = Math.min.apply(null, priceList);
      let colorsList = currentItem.color; // list of colors for item
      let recommended = currentItem.isRecommended;

      if (recommended)
        return (
          <div className="container search-result-item-rec">
            <div className="row v-center">
              <div className="col-xs-3 image-col">
                <a href="#" class="thumbnails">
                  <span className="badge badge-pill ">Recommended!</span>
                  <img
                    className="img-fluid item-image"
                    alt="Slick Fashion Portal"
                    onError={this.addDefaultSrc}
                    src={currentItem.imageURL}
                  />
                </a>
              </div>
              <div className="col-xs-5 display-result-col">
                <div className="row text-left text-primary search-result-heading">
                  {currentItem.title}
                </div>
                <div className="row text-left search-result-info">
                  <h5 className="col-xs-3  text-sm-left text-dark left-col">
                    <span className="row text-left text-dark Brand">
                      Brand:
                    </span>
                    <span className="row text-left text-dark Color">
                      Color:
                    </span>
                    <span className="row text-left text-dark Description">
                      Description:
                    </span>
                  </h5>
                  <h5 className="col-xs-9  text-lg-left text-truncate text-dark right-col">
                    <span className="row text-primary brand-result">
                      {currentItem.brand}
                    </span>
                    <a className="row text-primary color-result">
                      {colorsList.map(function(name, index) {
                        return (
                          <span id="name-style">
                            <span>{name}</span>
                          </span>
                        );
                      })}
                    </a>
                    <span className="row text-dark text-truncate desc-result">
                      {currentItem.description}
                    </span>
                  </h5>
                </div>
              </div>
              <div className="col-xs-4 info-sec-col">
                <div className="row">
                  <span className="p-3 mb-2 text-dark from">From </span>
                  <span className="p-3 mb-2 text-dark font-weight-bold actualprice">
                    {lowestPrice} €
                  </span>
                </div>
                <div className="flex-row">
                  <div className="flex-col" />
                  <div className="flex-col flex-col--end">
                    <div className="row align-items-end">
                      <div class="btn-group">
                        <button
                          type="button"
                          style={buttonSize}
                          aria-pressed="true"
                          onClick={() =>
                            this.props.history.push(
                              "/home/show/" + currentItem._id
                            )
                          }
                          class="btn"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          aria-pressed="true"
                          href="#"
                          disabled={
                            this.state.DisabledDictionary[currentItem._id]
                          }
                          onClick={() => {
                            UserService.addWishlistItem(
                              UserService.getCurrentUser().id,
                              currentItem._id
                            )
                              .then(res => {
                                this.state.DisabledDictionary[
                                  currentItem._id
                                ] = true;
                                this.setState({
                                  DisabledDictionary: this.state
                                    .DisabledDictionary
                                });
                                NotificationManager.success("Added to wishlist!");
                              })
                              .catch();
                          }}
                          style={buttonSize}
                          class="btn"
                        >
                          Add To Wishlist
                        </button>
                        <button
                          type="button"
                          style={buttonSize}
                          aria-pressed="true"
                          onClick={() => {
                            window.open(currentItem.purchaseLink, "_blank");
                          }}
                          class="btn btn-success"
                        >
                          Buy On Store
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      else
        return (
          <div className="container search-result-item">
            <div className="row v-center">
              <div className="col-xs-3 image-col">
                <a href="#" class="thumbnails">
                  <img
                    className="img-fluid item-image"
                    alt="Slick Fashion Portal"
                    onError={this.addDefaultSrc}
                    src={currentItem.imageURL}
                  />
                </a>
              </div>
              <div className="col-xs-5 display-result-col">
                <div className="row text-left text-primary search-result-heading">
                  {currentItem.title}
                </div>
                <div className="row text-left search-result-info">
                  <h5 className="col-xs-3  text-sm-left text-dark left-col">
                    <span className="row text-left text-dark Brand">
                      Brand:
                    </span>
                    <span className="row text-left text-dark Color">
                      Color:
                    </span>
                    <span className="row text-left text-dark Description">
                      Description:
                    </span>
                  </h5>
                  <h5 className="col-xs-9  text-lg-left text-truncate text-dark right-col">
                    <span className="row text-primary brand-result">
                      {currentItem.brand}
                    </span>
                    <a className="row text-primary color-result">
                      {colorsList.map(function(name, index) {
                        return (
                          <span id="name-style">
                            <span>{name}</span>
                          </span>
                        );
                      })}
                    </a>
                    <span className="row text-dark text-truncate desc-result">
                      {currentItem.description}
                    </span>
                  </h5>
                </div>
              </div>
              <div className="col-xs-4 info-sec-col">
                <div className="row">
                  <span className="p-3 mb-2 text-dark from">From </span>
                  <span className="p-3 mb-2 text-dark font-weight-bold actualprice">
                    {lowestPrice} €
                  </span>
                </div>
                <div className="flex-row">
                  <div className="flex-col" />
                  <div className="flex-col flex-col--end test">
                    <div className="row align-items-end">
                      <div class="btn-group">
                        <button
                          type="button"
                          style={buttonSize}
                          aria-pressed="true"
                          onClick={() =>
                            this.props.history.push(
                              "/home/show/" + currentItem._id
                            )
                          }
                          class="btn"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          aria-pressed="true"
                          href="#"
                          disabled={
                            this.state.DisabledDictionary[currentItem._id]
                          }
                          onClick={() => {
                            UserService.addWishlistItem(
                              UserService.getCurrentUser().id,
                              currentItem._id
                            )
                              .then(res => {
                                this.state.DisabledDictionary[
                                  currentItem._id
                                ] = true;
                                this.setState({
                                  DisabledDictionary: this.state
                                    .DisabledDictionary
                                });
                                NotificationManager.success("Added to wishlist!");
                              })
                              .catch();
                          }}
                          style={buttonSize}
                          class="btn"
                        >
                          Add To Wishlist
                        </button>
                        <button
                          type="button"
                          aria-pressed="true"
                          style={{ minWidth: "80px" }}
                          onClick={() => {
                            window.open(currentItem.purchaseLink, "_blank");
                          }}
                          style={buttonSize}
                          class="btn btn-success"
                        >
                          Buy On Store
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    });
  }

  render() {
    return (
      <Router>
        <div className="ResultsRendercontainer">
          <div className="col search-results-count">
            <p className="row-sm-1 row-md-1 row-lg-2">
              {this.state.results.length} Items found
            </p>
          </div>

          {this.itemList()}

          <div className="col-sm-8 stats">
            <p className="row">
              You have searched for {this.state.number} item(s)
              <button className="btn btn btn-link " onClick={this.handleSubmit}>
                Check search history
              </button>
            </p>
          </div>
        </div>
      </Router>
    );
  }
}

export default withRouter(SearchResults);
