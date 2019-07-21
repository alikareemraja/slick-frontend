import React, { Component } from "react";
import axios from "axios";
//import SearchResults from "./components/SearchResults";
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

    console.log("this.search_text: " + this.search_text);
    console.log("this.state.input_text: " + this.state.input_text);
    if (this.state.input_text) {
      if (this.state.input_text != this.search_text) {
        this.search_text = this.state.input_text;
        window.location.href = "/home/search/" + this.search_text;
        //this.props.history.push("/home/search/" + this.search_text);
        //  this.props.triggerParentUpdate(this.search_text);
        this.setState({ show: true });
        var time = new Date();
        const search_item = {
          searchItem: this.search_text,
          Date: time
        };
        console.log(search_item);
        axios.post(AddEndPoint, search_item).then(res => {});
      }
    } else window.alert("Empty search text");
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
                src={require("./images/ali.jpg")}
                className="img-circle"
                alt="User"
              />
            </div>
            <div className="pull-left info">
              <p>Ali Kareem Raja</p>
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
            {/* <li className="header">MAIN NAVIGATION</li>
                            <li className="active treeview menu-open">
                                <a href="fake_url">
                                    <i className="fa fa-dashboard" /> <span>Dashboard</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href="index.html"><i className="fa fa-circle-o" /> Dashboard v1</a></li>
                                    <li className="active"><a href="index2.html"><i className="fa fa-circle-o" /> Dashboard v2</a></li>
                                </ul>
                            </li>
                            <li className="treeview">
                                <a href="fake_url">
                                    <i className="fa fa-files-o" />
                                    <span>Layout Options</span>
                                    <span className="pull-right-container">
                                        <span className="label label-primary pull-right">4</span>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href="pages/layout/top-nav.html"><i className="fa fa-circle-o" /> Top Navigation</a></li>
                                    <li><a href="pages/layout/boxed.html"><i className="fa fa-circle-o" /> Boxed</a></li>
                                    <li><a href="pages/layout/fixed.html"><i className="fa fa-circle-o" /> Fixed</a></li>
                                    <li><a href="pages/layout/collapsed-sidebar.html"><i className="fa fa-circle-o" /> Collapsed Sidebar</a></li>
                                </ul>
                            </li> */}
            {/* <li className="treeview">
                                <a href="fake_url">
                                    <i className="fa fa-pie-chart" />
                                    <span>Charts</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href="pages/charts/chartjs.html"><i className="fa fa-circle-o" /> ChartJS</a></li>
                                    <li><a href="pages/charts/morris.html"><i className="fa fa-circle-o" /> Morris</a></li>
                                    <li><a href="pages/charts/flot.html"><i className="fa fa-circle-o" /> Flot</a></li>
                                    <li><a href="pages/charts/inline.html"><i className="fa fa-circle-o" /> Inline charts</a></li>
                                </ul>
                            </li>
                            <li className="treeview">
                                <a href="fake_url">
                                    <i className="fa fa-laptop" />
                                    <span>UI Elements</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href="pages/UI/general.html"><i className="fa fa-circle-o" /> General</a></li>
                                    <li><a href="pages/UI/icons.html"><i className="fa fa-circle-o" /> Icons</a></li>
                                    <li><a href="pages/UI/buttons.html"><i className="fa fa-circle-o" /> Buttons</a></li>
                                    <li><a href="pages/UI/sliders.html"><i className="fa fa-circle-o" /> Sliders</a></li>
                                    <li><a href="pages/UI/timeline.html"><i className="fa fa-circle-o" /> Timeline</a></li>
                                    <li><a href="pages/UI/modals.html"><i className="fa fa-circle-o" /> Modals</a></li>
                                </ul>
                            </li>
                            <li className="treeview">
                                <a href="fake_url">
                                    <i className="fa fa-edit" /> <span>Forms</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href="pages/forms/general.html"><i className="fa fa-circle-o" /> General Elements</a></li>
                                    <li><a href="pages/forms/advanced.html"><i className="fa fa-circle-o" /> Advanced Elements</a></li>
                                    <li><a href="pages/forms/editors.html"><i className="fa fa-circle-o" /> Editors</a></li>
                                </ul>
                            </li>
                            <li className="treeview">
                                <a href="fake_url">
                                    <i className="fa fa-table" /> <span>Tables</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href="pages/tables/simple.html"><i className="fa fa-circle-o" /> Simple tables</a></li>
                                    <li><a href="pages/tables/data.html"><i className="fa fa-circle-o" /> Data tables</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="pages/calendar.html">
                                    <i className="fa fa-calendar" /> <span>Calendar</span>
                                    <span className="pull-right-container">
                                        <small className="label pull-right bg-red">3</small>
                                        <small className="label pull-right bg-blue">17</small>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="pages/mailbox/mailbox.html">
                                    <i className="fa fa-envelope" /> <span>Mailbox</span>
                                    <span className="pull-right-container">
                                        <small className="label pull-right bg-yellow">12</small>
                                        <small className="label pull-right bg-green">16</small>
                                        <small className="label pull-right bg-red">5</small>
                                    </span>
                                </a>
                            </li>
                            <li className="treeview">
                                <a href="fake_url">
                                    <i className="fa fa-folder" /> <span>Examples</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href="pages/examples/invoice.html"><i className="fa fa-circle-o" /> Invoice</a></li>
                                    <li><a href="pages/examples/profile.html"><i className="fa fa-circle-o" /> Profile</a></li>
                                    <li><a href="pages/examples/login.html"><i className="fa fa-circle-o" /> Login</a></li>
                                    <li><a href="pages/examples/register.html"><i className="fa fa-circle-o" /> Register</a></li>
                                    <li><a href="pages/examples/lockscreen.html"><i className="fa fa-circle-o" /> Lockscreen</a></li>
                                    <li><a href="pages/examples/404.html"><i className="fa fa-circle-o" /> 404 Error</a></li>
                                    <li><a href="pages/examples/500.html"><i className="fa fa-circle-o" /> 500 Error</a></li>
                                    <li><a href="pages/examples/blank.html"><i className="fa fa-circle-o" /> Blank Page</a></li>
                                    <li><a href="pages/examples/pace.html"><i className="fa fa-circle-o" /> Pace Page</a></li>
                                </ul>
                            </li>
                            <li className="treeview">
                                <a href="fake_url">
                                    <i className="fa fa-share" /> <span>Multilevel</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href="fake_url"><i className="fa fa-circle-o" /> Level One</a></li>
                                    <li className="treeview">
                                        <a href="fake_url"><i className="fa fa-circle-o" /> Level One
                <span className="pull-right-container">
                                                <i className="fa fa-angle-left pull-right" />
                                            </span>
                                        </a>
                                        <ul className="treeview-menu">
                                            <li><a href="fake_url"><i className="fa fa-circle-o" /> Level Two</a></li>
                                            <li className="treeview">
                                                <a href="fake_url"><i className="fa fa-circle-o" /> Level Two
                    <span className="pull-right-container">
                                                        <i className="fa fa-angle-left pull-right" />
                                                    </span>
                                                </a>
                                                <ul className="treeview-menu">
                                                    <li><a href="fake_url"><i className="fa fa-circle-o" /> Level Three</a></li>
                                                    <li><a href="fake_url"><i className="fa fa-circle-o" /> Level Three</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="fake_url"><i className="fa fa-circle-o" /> Level One</a></li>
                                </ul>
                            </li>
                            <li><a href="https://adminlte.io/docs"><i className="fa fa-book" /> <span>Documentation</span></a></li>
                            <li className="header">LABELS</li>
                            <li><a href="fake_url"><i className="fa fa-circle-o text-red" /> <span>Important</span></a></li>
                            <li><a href="fake_url"><i className="fa fa-circle-o text-yellow" /> <span>Warning</span></a></li>
                            <li><a href="fake_url"><i className="fa fa-circle-o text-aqua" /> <span>Information</span></a></li> */}
          </ul>
        </section>
        {/* /.sidebar */}
        <section />
      </aside>
    );
  }
}
