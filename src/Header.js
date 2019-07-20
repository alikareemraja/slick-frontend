import React, { Component } from 'react';
import SearchField from "react-search-field";
import UserService from './UserService';

export default class Header extends Component {
    render() {
        return (
            <div>
                <header className="main-header">
                    {/* Logo */}
                    <a href="/" className="logo">
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

                                <li className="dropdown messages-menu">
                                    {/* <SearchField
                                        placeholder="Search..."
                                        searchText="This is initial search text"
                                        classNames="active-cyan-4 mb-4"
                                    /> */}
                                </li>

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
                                        
                                        {/* Menu Footer*/}
                                        <li className="user-footer">
                                            <div className="pull-left">
                                                <a href="fake_url" className="btn btn-default btn-flat">Profile</a>
                                            </div>
                                            <div className="pull-right">
                                                <a href="/" className="btn btn-default btn-flat" onClick={UserService.logout}>Sign out</a>
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