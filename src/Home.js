import React, { Component } from 'react';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Menu/>
                <Footer/>
            </div>
        );
    }
}

export default Home;