import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div>
                <header className="main-header">
                    {/* Logo */}
                    <a href="index2.html" className="logo">
                        {/* mini logo for sidebar mini 50x50 pixels */}
                        <span className="logo-mini"><b>A</b>LT</span>
                        {/* logo for regular state and mobile devices */}
                        <span className="logo-lg"><b>Slick</b></span>
                    </a>
                    {/* Header Navbar: style can be found in header.less */}
                    <nav className="navbar navbar-static-top">
                        {/* Sidebar toggle button*/}
                        {/* <a href="fake_url" className="sidebar-toggle" data-toggle="push-menu" role="button">
                            <span className="sr-only">Toggle navigation</span>
                        </a> */}
                        {/* Navbar Right Menu */}
                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                                {/* Messages: style can be found in dropdown.less*/}
                                {/* <li className="dropdown messages-menu">
                                    <a href="fake_url" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="fa fa-envelope-o" />
                                        <span className="label label-success">4</span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="header">You have 4 messages</li>
                                        <li>
                                            
                                            <ul className="menu">
                                                <li>
                                                    <a href="fake_url">
                                                        <div className="pull-left">
                                                            <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User" />
                                                        </div>
                                                        <h4>
                                                            Support Team
                        <small><i className="fa fa-clock-o" /> 5 mins</small>
                                                        </h4>
                                                        <p>Why not buy a new awesome theme?</p>
                                                    </a>
                                                </li>
                                                
                                                <li>
                                                    <a href="fake_url">
                                                        <div className="pull-left">
                                                            <img src="dist/img/user3-128x128.jpg" className="img-circle" alt="User" />
                                                        </div>
                                                        <h4>
                                                            AdminLTE Design Team
                        <small><i className="fa fa-clock-o" /> 2 hours</small>
                                                        </h4>
                                                        <p>Why not buy a new awesome theme?</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="fake_url">
                                                        <div className="pull-left">
                                                            <img src="dist/img/user4-128x128.jpg" className="img-circle" alt="User" />
                                                        </div>
                                                        <h4>
                                                            Developers
                        <small><i className="fa fa-clock-o" /> Today</small>
                                                        </h4>
                                                        <p>Why not buy a new awesome theme?</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="fake_url">
                                                        <div className="pull-left">
                                                            <img src="dist/img/user3-128x128.jpg" className="img-circle" alt="User" />
                                                        </div>
                                                        <h4>
                                                            Sales Department
                        <small><i className="fa fa-clock-o" /> Yesterday</small>
                                                        </h4>
                                                        <p>Why not buy a new awesome theme?</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="fake_url">
                                                        <div className="pull-left">
                                                            <img src="dist/img/user4-128x128.jpg" className="img-circle" alt="User" />
                                                        </div>
                                                        <h4>
                                                            Reviewers
                        <small><i className="fa fa-clock-o" /> 2 days</small>
                                                        </h4>
                                                        <p>Why not buy a new awesome theme?</p>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="footer"><a href="fake_url">See All Messages</a></li>
                                    </ul>
                                </li> */}
                                {/* Notifications: style can be found in dropdown.less */}
                                <li className="dropdown notifications-menu">
                                    <a href="fake_url" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="fa fa-bell-o" />
                                        <span className="label label-warning">10</span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="header">You have 10 notifications</li>
                                        <li>
                                            {/* inner menu: contains the actual data */}
                                            <ul className="menu">
                                                <li>
                                                    <a href="fake_url">
                                                        <i className="fa fa-users text-aqua" /> 5 new members joined today
                    </a>
                                                </li>
                                                <li>
                                                    <a href="fake_url">
                                                        <i className="fa fa-warning text-yellow" /> Very long description here that may not fit into the
                                                        page and may cause design problems
                    </a>
                                                </li>
                                                <li>
                                                    <a href="fake_url">
                                                        <i className="fa fa-users text-red" /> 5 new members joined
                    </a>
                                                </li>
                                                <li>
                                                    <a href="fake_url">
                                                        <i className="fa fa-shopping-cart text-green" /> 25 sales made
                    </a>
                                                </li>
                                                <li>
                                                    <a href="fake_url">
                                                        <i className="fa fa-user text-red" /> You changed your username
                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="footer"><a href="fake_url">View all</a></li>
                                    </ul>
                                </li>
                                
                                {/* User Account: style can be found in dropdown.less */}
                                <li className="dropdown user user-menu">
                                    <a href="fake_url" className="dropdown-toggle" data-toggle="dropdown">
                                        <img src={require('./images/ali.jpg')} className="user-image" alt="User" />
                                        <span className="hidden-xs">Ali Kareem Raja</span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        {/* User image */}
                                        <li className="user-header">
                                            <img src={require('./images/ali.jpg')} className="img-circle" alt="User" />
                                            <p>
                                                Ali Kareem Raja - Web Developer
                  <small>Member since Nov. 2012</small>
                                            </p>
                                        </li>
                                        {/* Menu Body */}
                                        {/* <li className="user-body">
                                            <div className="row">
                                                <div className="col-xs-4 text-center">
                                                    <a href="fake_url">Followers</a>
                                                </div>
                                                <div className="col-xs-4 text-center">
                                                    <a href="fake_url">Sales</a>
                                                </div>
                                                <div className="col-xs-4 text-center">
                                                    <a href="fake_url">Friends</a>
                                                </div>
                                            </div>
                                            
                                        </li> */}
                                        {/* Menu Footer*/}
                                        <li className="user-footer">
                                            <div className="pull-left">
                                                <a href="fake_url" className="btn btn-default btn-flat">Profile</a>
                                            </div>
                                            <div className="pull-right">
                                                <a href="fake_url" className="btn btn-default btn-flat">Sign out</a>
                                            </div>
                                        </li>
                                    </ul>
                                </li>                                
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>

        );
    }
}