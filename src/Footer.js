import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <footer className="main-footer">
                <div className="pull-right hidden-xs">
                    <b>Version</b> 1.0.0
                </div>
                <strong>Copyright © 2019 <a href="https://www.tum.de">Technische Universität München</a>.</strong> 
                All rights reserved.
            </footer>

        );
    }
}