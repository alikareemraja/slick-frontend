import React, { Component } from "react";
import axios from "axios";
//import "bootstrap/dist/css/bootstrap.css";
import "../DispFormat.css";
const SearchEndPoint = "http://localhost:4000/search/";

/*
const SearchObj = {
  //result: this.state.result,
  input_text: this.state.input_text,
  search_history: this.state.search_history
};*/

class SearchResults extends Component {
  // state = {};
  constructor(props) {
    // the constructor is to set the initial state of results
    super(props);
    this.itemList = this.itemList.bind(this);
    this.state = {
      results: [] //empty array of results properties
      //number: "0"
      //      input_text: this.props.search_text
    };
  }
  //init the results prop fron DB, send req to BE and get the list of items
  // component lifecycle method

  componentDidMount() {
    axios
      .get(SearchEndPoint, {
        params: {
          input_text: this.props.input_text
        }
      }) // no data sent with GET so we get the list of items
      .then(response => {
        this.setState({ results: response.data }); //once the response is available,
        //this callback is active, setting the items sate to response data
      }) // catch to print out to console in case of errors
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // console.log(
    // "INSIDE componentDidUpdate, this.props.input_text" + this.props.input_text
    // );
    console.log(
      "INSIDE componentDidUpdate, this.state.results.length" +
        this.state.results.length
    );

    //     <span className="badge badge-pill ">Recommended!</span>
    axios
      .get(SearchEndPoint, {
        params: {
          input_text: this.props.input_text
          // input_text: "Great"
        }
      }) // no data sent with GET so we get the list of items
      .then(response => {
        this.setState({ results: response.data }); //once the response is available,
        //this callback is active, setting the items sate to response data
      }) // catch to print out to console in case of errors
      .catch(function(error) {
        console.log(error);
      });
  }

  itemList() {
    //iterate over what is indside the state results using the map method
    //to iterate inside the elements of the results array, passing a callback function
    //used for every item

    return this.state.results.map((currentItem, i) => {
      // return <ITEM resultItem={currentItem} key={i} />;
      console.log("currentItem: " + currentItem.input_text);
      if (currentItem.input_text === "Great")
        return (
          <div className="container search-result-item-rec">
            <div className="col-sm-5 col-md-6 col-lg-8 image-col">
              <img
                className="img-fluid item-image"
                alt="Responsive image"
                src="https://bootdey.com/img/Content/avatar/avatar2.png"
              />
              <span className="badge badge-pill ">Recommended!</span>
              {/*<div className="row search-result-item-body-r">*/}
              {/*  <div className="col-sm-2 col-md-3 col-lg-8  display-result">*/}
            </div>
            <div className="col-sm-6 col-md-7 col-lg-8 display-result-col">
              <p className="row-sm-2 row-md-3 row-lg-5 text-left text-primary search-result-heading">
                Adidas,{i}
              </p>
              <p className="row text-left search-result-info">
                <h5 className="col-sm-1 col-md-2 col-lg-3 text-sm-left text-md-left text-lg-left text-dark left-col">
                  <span className="row text-left text-dark Brand"> Brand:</span>
                  <span className="row text-left text-dark Color"> Color:</span>
                  <span className="row text-left text-dark Top-Comment">
                    Top comment:
                  </span>
                  <span className="row text-left text-dark Description">
                    Description:
                  </span>
                </h5>
                <h5 className="col-sm-4 col-md-6 col-lg-9 text-sm-left text-md-left text-lg-left text-truncate text-dark right-col">
                  <a className="row text-primary brand-result">
                    current item i-text : {currentItem.input_text}
                  </a>
                  <a className="row text-primary color-result">
                    state i-text:{this.state.input_text}
                  </a>
                  <a className="row text-dark text-truncate comment-result">
                    TTTTTTTTTTTTT
                  </a>
                  <a className="row text-dark text-truncate desc-result">
                    DDDDDDD
                  </a>
                </h5>
              </p>
            </div>
            <div className="col-sm-3 info-sec-col">
              <p className="row-sm-1 row-md-2 row-lg-3 text-sm-right text-md-right text-lg-right text-primary price">
                <a className="mb-2 text-dark font-weight-bold from">From </a>
                <a className="mb-2 text-dark font-weight-bold actualprice">
                  $3, 200
                </a>
              </p>
              <p className="row-sm-2 row-md-3 row-lg-5 buttons">
                <a className="btn btn-success btn-sm Add" href="#">
                  Add to wish list
                </a>
                <a className="btn btn-primary btn-sm Go" href="#">
                  Go to website
                </a>
              </p>
            </div>
          </div>
        );
      else
        return (
          /* <section className="search-result-item" key={i}>*/

          <div className="container search-result-item">
            <div className="row ng-scope">
              <div className="col-sm-5 col-md-6 col-lg-8 image-col">
                <img
                  className="img-fluid item-image"
                  alt="Responsive image"
                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                />
                {/*  <span className="badge badge-pill ">Recommended!</span>*/}
                {/*<div className="row search-result-item-body-r">*/}
                {/*  <div className="col-sm-2 col-md-3 col-lg-8  display-result">*/}
              </div>
              <div className="col-sm-6 col-md-7 col-lg-8 display-result-col">
                <p className="row-sm-2 row-md-3 row-lg-5 text-left text-primary search-result-heading">
                  Adidas,{i}
                </p>
                <p className="row text-left search-result-info">
                  <h5 className="col-sm-1 col-md-2 col-lg-3 text-sm-left text-md-left text-lg-left text-dark left-col">
                    <span className="row text-left text-dark Brand">
                      {" "}
                      Brand:
                    </span>
                    <span className="row text-left text-dark Color">
                      {" "}
                      Color:
                    </span>
                    <span className="row text-left text-dark Top-Comment">
                      Top comment:
                    </span>
                    <span className="row text-left text-dark Description">
                      Description:
                    </span>
                  </h5>
                  <h5 className="col-sm-4 col-md-6 col-lg-9 text-sm-left text-md-left text-lg-left text-truncate text-dark right-col">
                    <a className="row text-primary brand-result">
                      current item i-text : {currentItem.input_text}
                    </a>
                    <a className="row text-primary color-result">
                      state i-text:{this.state.input_text}
                    </a>
                    <a className="row text-dark text-truncate comment-result">
                      TTTTTTTTTTTTTTTTTTTTTT
                    </a>
                    <a className="row text-dark text-truncate desc-result">
                      DDDDDDD
                    </a>
                  </h5>
                </p>
              </div>
              <div className="col-sm-6 col-md-7 col-lg-9 info-sec-col">
                <p className="row-sm-1 row-md-2 row-lg-3 text-sm-right text-md-right text-lg-right text-primary price">
                  <a className="mb-2 text-dark font-weight-bold from">From </a>
                  <a className="mb-2 text-dark font-weight-bold actualprice">
                    $3, 200
                  </a>
                </p>
                <p className="row-sm-2 row-md-3 row-lg-5 buttons">
                  <a className="btn btn-success btn-sm Add" href="#">
                    Add to wish list
                  </a>
                  <a className="btn btn-primary btn-sm Go" href="#">
                    Go to website
                  </a>
                </p>
              </div>
            </div>{" "}
          </div>
          /*  </section>*/
        );
    });
  }

  render() {
    /*    console.log(
      "search results render, this.props.input_text  " + this.props.input_text
    );
    console.log(
      "search results render, this.props.search_text  " + this.props.search_text
    );*/

    return (
      <div className="ResultsRendercontainer">
        {/*        <div className="container"> 

        <div className="row ng-scope">*/}
        {/*   <div className="col-12 col-sm-6 col-md-10 col-lg-12 px-2 mb-3"> */}
        <p className="search-results-count">
          {this.state.results.length} results
        </p>
        {this.itemList()}
        {/*  </div>
         </div>
           </div> 
        <div className="text-align-center">*/}
        <ul className="pagination pagination-sm">
          <li className="disabled">
            <a href="#">Prev</a>
          </li>
          <li className="active">
            <a href="#">1</a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">Next</a>
          </li>
        </ul>

        {/* </div> */}
      </div>
    );
  }
}

export default SearchResults;
