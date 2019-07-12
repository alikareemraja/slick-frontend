import React, { Component } from 'react';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import Comment from './Comment'

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
                            Wardrobe
      <small>your custom choice</small>
                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="no_url"><i className="fa fa-dashboard" /> Home</a></li>
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