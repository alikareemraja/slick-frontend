import React, { Component } from 'react';
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


                                {/* User Account: style can be found in dropdown.less */}
                                <li className="dropdown user user-menu">
                                    <a href="fake_url" className="dropdown-toggle" data-toggle="dropdown">
                                        <img src={this.props.userImgSrc} className="user-image" alt="User" />
                                        <span className="hidden-xs">{this.props.userFullName}</span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        {/* User image */}
                                        <li className="user-header">
                                            <img src={this.props.userImgSrc} className="img-circle" alt="User" />
                                            <p>{this.props.userFullName}</p>
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