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
import {NotificationContainer, NotificationManager} from 'react-notifications';

const SearchEndPoint = "http://localhost:3001/search/get";
const StatisticsEndPoint = "http://localhost:3001/search/stat";


const buttonSize = {minHeight: "50px"}
class SearchResults extends Component {
  constructor(props) {
    // the constructor is to set the initial state of results
    super(props);
    this.itemList = this.itemList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
    this.state = {
      results: [], //empty array of results properties
      number: 0
    };
  }

  componentDidMount() {
    //   var url = SearchEndPoint + "?category=" + this.props.input_text;
    var url = SearchEndPoint + "?category=" + this.props.match.params.query;
    console.log("URL: ");
    console.log(url);
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }
    fetch(url, { headers: header })
      .then(res => res.json())
      .then(response => {
        this.setState({ results: response });
      })
      .catch(function(error) {
        console.log(error);
      });

    fetch(StatisticsEndPoint, { headers: header }) // no data sent with GET so we get the list of items
      .then(res => res.json())
      .then(response => {
        this.setState({ number: response.length });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.input_text !== this.props.input_text) {
      let token = window.localStorage["jwtToken"];
      let header = new Headers();
      if (token) {
        header.append("Authorization", `JWT ${token}`);
      }
      // var url = SearchEndPoint + "?category=" + this.props.input_text;
      var url = SearchEndPoint + "?category=" + this.props.match.params.query;
      console.log("URL: ");
      console.log(url);

      fetch(url, { headers: header })
        .then(res => res.json())
        .then(response => {
          this.setState({ results: response });
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });

      fetch(StatisticsEndPoint, { headers: header }) // no data sent with GET so we get the list of items
        .then(res => res.json())
        .then(response => {
          this.setState({ number: response.length });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  recommender() {
    let recommended = Math.random() >= 0.5;
    return recommended;
  }

  handleSubmit = () => {
    window.location.href = "/home/searchStat";
  };

  addDefaultSrc(ev) {
    //    ev.target.src = "https://bootdey.com/img/Content/avatar/avatar2.png";
    ev.target.src =
      "http://icons.iconarchive.com/icons/iconsmind/outline/256/T-Shirt-icon.png";
  }
  itemList() {
    console.log("this.state.results: ");
    console.log(this.state.results);
    return this.state.results.map((currentItem, i) => {
      console.log("currentItem: ");
      console.log(currentItem);
      console.log("currentItem category: " + currentItem.category);
      console.log("currentItem id: " + currentItem._id);
      console.log("currentItem image: " + currentItem.imageURL);
      console.log("currentItem isRecommended: " + currentItem.isRecommended);
      console.log("currentItem Image url: " + currentItem.imageURL);
      console.log("currentItem brand: " + currentItem.brand);
      console.log("currentItem retailers: ");
      console.log(currentItem.retailers);
      console.log(currentItem);
      let itemPriceList = currentItem.retailers,
        priceList = [];
      console.log("itemPriceList ");
      console.log(itemPriceList);
      itemPriceList.map((p, i) => {
        priceList.push(itemPriceList[i]["price"]);
      });
      console.log(priceList);
      let lowestPrice = Math.min.apply(null, priceList);
      console.log("Lowest Price: ");
      console.log(lowestPrice);
      let colorsList = currentItem.color;
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
                          <span id="ttt">
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
                      <button type="button" style={buttonSize} aria-pressed="true"
                          onClick={() =>
                            this.props.history.push(
                              "/home/show/" + currentItem._id
                            )
                          } class="btn">View</button>
                      <button type="button" aria-pressed="true"
                          href="#"
                          onClick={() => {
                            UserService.addWishlistItem(
                              UserService.getCurrentUser().id,
                              currentItem._id
                            ).then(res => {
                              NotificationManager.success("Added to wishlist");
                            }).catch();
                          }}  style={buttonSize} class="btn">Add To Wishlist</button>
                      <button type="button" style={buttonSize} aria-pressed="true"
                          
                          onClick={() => {
                            window.open(currentItem.purchaseLink, "_blank");
                          }} class="btn btn-success">Buy On Store</button>
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
                          <span id="ttt">
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
                      <button type="button" style={buttonSize} aria-pressed="true"
                          onClick={() =>
                            this.props.history.push(
                              "/home/show/" + currentItem._id
                            )
                          } class="btn">View</button>
                      <button type="button" aria-pressed="true"
                          href="#"
                          onClick={() => {
                            UserService.addWishlistItem(
                              UserService.getCurrentUser().id,
                              currentItem._id
                            ).then(res => {
                              NotificationManager.success("Added to wishlist");
                            }).catch();;
                          }}  style={buttonSize}class="btn">Add To Wishlist</button>
                      <button type="button" aria-pressed="true"
                          style={{ minWidth: "80px" }}
                          onClick={() => {
                            window.open(currentItem.purchaseLink, "_blank");
                          }} style={buttonSize} class="btn btn-success">Buy On Store</button>
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
              {this.state.results.length} Results
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
