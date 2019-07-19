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
const StatisticsRemoveEndPoint = "http://localhost:3001/search/";
const StatisticsEndPoint = "http://localhost:3001/search/stat";

export default class searchStat extends Component {
  constructor(props) {
    super(props);
    this.sList = this.sList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { search_Stats: [] };
  }

  componentDidMount() {
    fetch(StatisticsEndPoint) // no data sent with GET so we get the list of items
      .then(res => res.json())
      .then(response => {
        console.log("=========================================");
        this.setState({ search_Stats: response });
        console.log(this.state.search_Stats);
        console.log("=========================================");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleClick = id => e => {
    e.preventDefault();
    let url = StatisticsRemoveEndPoint + id;
    console.log(id);
    axios
      .delete(url)
      .then(response => {
        console.log(response);
        console.log("this.state.search_Stats from inside handle click ");
        console.log(this.state.search_Stats);
        console.log("FILTERED from inside handle click ");
        this.setState({
          search_Stats: this.state.search_Stats.filter(item => item._id !== id)
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(url);
  };

  sList() {
    return this.state.search_Stats.map((current, i) => (
      <tr>
        <th scope="row">{i}</th>
        <th scope="row">{current._id}</th>
        <td>{current.search_item}</td>
        <td>{current.count}</td>
        <td>
          <button
            type="button"
            class="btn btn-link"
            onClick={this.handleClick(current._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <h3>Search Statistics</h3>
        <table className="table table-striped w-auto" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Item</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.sList()}</tbody>
        </table>
      </div>
    );
  }
}
