import React, { Component } from 'react';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

class Home extends Component {


    render() {
        return (
            <div>
                <Header />
                <Menu />
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <h1>
                            Blank page
      <small>it all starts here</small>
                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
                            <li className="active">Home page</li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section className="content">
                    </section>
                    {/* /.content */}
                </div>
                {/* /.content-wrapper */}

<Footer/>
            </div>
        );
    }
}

export default Home;